/**
 * Document Reader & AI Study Notes Controller
 * Handles:
 *  1. POST /api/document/read       — Upload PDF, DOCX, TXT; extract text & metadata.
 *  2. POST /api/document/summarize  — Generate structured 9-part academic study notes.
 *  3. POST /api/document/chat       — Chat with the uploaded document using smart context chunking.
 */

'use strict';

const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const JSZip = require('jszip');
const {
  isApiKeyConfigured,
  getGenAIClient,
  getModelName,
  getFallbackModelName,
} = require('../config/gemini');

// ── PPTX Parser Helper ────────────────────────────────────────────────────────
function decodeXml(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/**
 * Extracts structured presentation text from a PowerPoint (.pptx) buffer or ArrayBuffer.
 * Handles:
 *  - Slide order via ppt/presentation.xml and relationships (or numerical fallback).
 *  - Slide titles (<p:ph type="title|ctrTitle">).
 *  - Body paragraphs, text boxes, and indented bullet points.
 *  - Tables (<a:tbl>) formatted as Markdown tables.
 *  - Speaker notes (<p:notes>) linked to slides.
 *  - Sparse/image-only presentation detection.
 */
async function extractPptxText(bufferOrArrayBuffer) {
  const zip = await JSZip.loadAsync(bufferOrArrayBuffer);
  
  // 1. Determine slide order from ppt/presentation.xml and ppt/_rels/presentation.xml.rels
  let slidePaths = [];
  try {
    const presXmlFile = zip.file('ppt/presentation.xml');
    const presRelsFile = zip.file('ppt/_rels/presentation.xml.rels');

    if (presXmlFile && presRelsFile) {
      const presXmlStr = await presXmlFile.async('string');
      const presRelsStr = await presRelsFile.async('string');

      const relMap = {};
      const relRegex = /<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g;
      let rMatch;
      while ((rMatch = relRegex.exec(presRelsStr)) !== null) {
        relMap[rMatch[1]] = rMatch[2];
      }

      const sldIdRegex = /<p:sldId[^>]*r:id="([^"]+)"/g;
      let sMatch;
      while ((sMatch = sldIdRegex.exec(presXmlStr)) !== null) {
        const target = relMap[sMatch[1]];
        if (target) {
          const normTarget = target.startsWith('ppt/') ? target : (target.startsWith('/') ? target.slice(1) : 'ppt/' + target);
          slidePaths.push(normTarget);
        }
      }
    }
  } catch (e) {
    console.warn('[DocumentController] Could not parse presentation.xml order, falling back to file listing:', e.message);
  }

  // Fallback: If no slide paths found from presentation.xml, find all ppt/slides/slide*.xml
  if (slidePaths.length === 0) {
    const allFiles = Object.keys(zip.files);
    slidePaths = allFiles
      .filter((f) => /^ppt\/slides\/slide\d+\.xml$/i.test(f))
      .sort((a, b) => {
        const numA = parseInt(a.match(/slide(\d+)\.xml/i)?.[1] || '0', 10);
        const numB = parseInt(b.match(/slide(\d+)\.xml/i)?.[1] || '0', 10);
        return numA - numB;
      });
  }

  const slides = [];

  for (let i = 0; i < slidePaths.length; i++) {
    const slidePath = slidePaths[i];
    const slideFile = zip.file(slidePath);
    if (!slideFile) continue;

    const xml = await slideFile.async('string');
    const slideNum = i + 1;

    let slideTitle = '';
    const contentLines = [];

    // Extract title & text shapes (<p:sp>)
    const spRegex = /<p:sp\b[^>]*>([\s\S]*?)<\/p:sp>/g;
    let spMatch;
    while ((spMatch = spRegex.exec(xml)) !== null) {
      const spXml = spMatch[1];
      const isTitle = /<p:ph[^>]*type="(?:title|ctrTitle)"/i.test(spXml);

      // Extract paragraphs in this shape
      const pRegex = /<a:p\b[^>]*>([\s\S]*?)<\/a:p>/g;
      let pMatch;
      const paragraphs = [];

      while ((pMatch = pRegex.exec(spXml)) !== null) {
        const pXml = pMatch[1];
        const hasBullet = /<a:buChar|<a:buAutoNum|<a:buBlip/i.test(pXml) || /<a:pPr\b[^>]*lvl="[1-9]"/i.test(pXml);

        const textParts = [];
        const tRegex = /<a:t\b[^>]*>([\s\S]*?)<\/a:t>/g;
        let tMatch;
        while ((tMatch = tRegex.exec(pXml)) !== null) {
          textParts.push(decodeXml(tMatch[1]));
        }
        const paragraphText = textParts.join('').trim();
        if (paragraphText) {
          paragraphs.push({ text: paragraphText, isBullet: hasBullet });
        }
      }

      if (isTitle && !slideTitle && paragraphs.length > 0) {
        slideTitle = paragraphs.map((p) => p.text).join(' ');
      } else {
        paragraphs.forEach((p) => {
          if (p.isBullet) {
            contentLines.push(`• ${p.text}`);
          } else {
            contentLines.push(p.text);
          }
        });
      }
    }

    // Extract Tables (<a:tbl>)
    const tblRegex = /<a:tbl\b[^>]*>([\s\S]*?)<\/a:tbl>/g;
    let tblMatch;
    while ((tblMatch = tblRegex.exec(xml)) !== null) {
      const tblXml = tblMatch[1];
      const rowRegex = /<a:tr\b[^>]*>([\s\S]*?)<\/a:tr>/g;
      let rowMatch;
      const tableRows = [];

      while ((rowMatch = rowRegex.exec(tblXml)) !== null) {
        const trXml = rowMatch[1];
        const cellRegex = /<a:tc\b[^>]*>([\s\S]*?)<\/a:tc>/g;
        let cellMatch;
        const cells = [];

        while ((cellMatch = cellRegex.exec(trXml)) !== null) {
          const tcXml = cellMatch[1];
          const cellTextParts = [];
          const tRegex = /<a:t\b[^>]*>([\s\S]*?)<\/a:t>/g;
          let tMatch;
          while ((tMatch = tRegex.exec(tcXml)) !== null) {
            cellTextParts.push(decodeXml(tMatch[1]));
          }
          cells.push(cellTextParts.join(' ').trim());
        }
        if (cells.some((c) => c.length > 0)) {
          tableRows.push(cells);
        }
      }

      if (tableRows.length > 0) {
        contentLines.push('\n[Table]');
        tableRows.forEach((row) => {
          contentLines.push('| ' + row.join(' | ') + ' |');
        });
        contentLines.push('');
      }
    }

    // Check for Speaker Notes (<p:notes>)
    let speakerNotes = '';
    const slideRelPath = slidePath.replace(/ppt\/slides\/(slide\d+\.xml)/i, 'ppt/slides/_rels/$1.rels');
    const slideRelsFile = zip.file(slideRelPath);
    if (slideRelsFile) {
      try {
        const relsXml = await slideRelsFile.async('string');
        const notesRelMatch = /<Relationship[^>]*Type="[^"]*notesSlide"[^>]*Target="([^"]+)"/i.exec(relsXml);
        if (notesRelMatch) {
          let notesTarget = notesRelMatch[1];
          if (!notesTarget.startsWith('ppt/')) {
            notesTarget = notesTarget.startsWith('../') ? 'ppt/' + notesTarget.replace('../', '') : 'ppt/slides/' + notesTarget;
          }
          const notesFile = zip.file(notesTarget);
          if (notesFile) {
            const notesXml = await notesFile.async('string');
            const notesParts = [];
            const ntRegex = /<a:t\b[^>]*>([\s\S]*?)<\/a:t>/g;
            let ntMatch;
            while ((ntMatch = ntRegex.exec(notesXml)) !== null) {
              const txt = ntMatch[1].trim();
              if (txt && !/^\d+$/.test(txt)) {
                notesParts.push(decodeXml(txt));
              }
            }
            if (notesParts.length > 0) {
              speakerNotes = notesParts.join(' ');
            }
          }
        }
      } catch (e) {
        // Ignore note parsing errors
      }
    }

    slides.push({
      slideNumber: slideNum,
      title: slideTitle || `Slide ${slideNum}`,
      content: contentLines.join('\n').trim(),
      notes: speakerNotes.trim(),
    });
  }

  // Format full text preserving slide-by-slide structure
  const formattedSections = slides.map((s) => {
    let out = `### Slide ${s.slideNumber}: ${s.title}\n`;
    if (s.content) out += `${s.content}\n`;
    if (s.notes) out += `*Speaker Notes:* ${s.notes}\n`;
    return out.trim();
  });

  const fullText = formattedSections.join('\n\n');
  const totalWords = (fullText.match(/\S+/g) || []).length;
  const isSparse = totalWords < 10 && slides.length > 0;

  return {
    slideCount: slides.length,
    slides,
    fullText: isSparse
      ? (fullText ? `${fullText}\n\n[Note: This presentation contains minimal selectable text. Some slides may be graphic-heavy or image-only.]` : '[This presentation contains no selectable text or only graphic slides.]')
      : fullText,
    isSparse,
    totalWords,
  };
}

exports.extractPptxText = extractPptxText;

// ── Multer In-Memory Storage Configuration ─────────────────────────────────────
// Uses memoryStorage to avoid leaving orphaned files on disk.
// Strict 10MB limit and file filter for PDF, DOCX, PPTX, TXT, and images.
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-powerpoint',
    'text/plain',
    'image/png',
    'image/jpeg',
    'image/webp',
  ];
  const ext = (file.originalname || '').toLowerCase();
  const hasValidExt =
    ext.endsWith('.pdf') ||
    ext.endsWith('.docx') ||
    ext.endsWith('.pptx') ||
    ext.endsWith('.ppt') ||
    ext.endsWith('.txt') ||
    ext.endsWith('.png') ||
    ext.endsWith('.jpg') ||
    ext.endsWith('.jpeg') ||
    ext.endsWith('.webp');

  if (allowedMimes.includes(file.mimetype) || hasValidExt) {
    cb(null, true);
  } else {
    const err = new Error('UNSUPPORTED_FILE_TYPE');
    err.code = 'UNSUPPORTED_FILE_TYPE';
    cb(err, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
}).single('document');

// ── Multer Middleware Wrapper ──────────────────────────────────────────────────
exports.uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          status: 'error',
          code: 'FILE_TOO_LARGE',
          message: 'The uploaded file exceeds the 10 MB limit. Please upload a smaller document.',
        });
      }
      if (err.code === 'UNSUPPORTED_FILE_TYPE') {
        return res.status(400).json({
          status: 'error',
          code: 'UNSUPPORTED_FILE_TYPE',
          message: 'Unsupported file format. Please upload a PDF (.pdf), Word (.docx), PowerPoint (.pptx), or Text (.txt) file.',
        });
      }
      return res.status(400).json({
        status: 'error',
        code: 'UPLOAD_ERROR',
        message: err.message || 'An error occurred during file upload.',
      });
    }
    next();
  });
};

// ── 1. Document Read & Text Extraction ─────────────────────────────────────────
exports.postDocumentRead = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        status: 'error',
        code: 'NO_FILE_PROVIDED',
        message: 'No document was received. Please select a PDF, DOCX, or TXT file to upload.',
      });
    }

    const { originalname, size, mimetype, buffer } = req.file;
    const lowerName = originalname.toLowerCase();

    let extractedText = '';
    let pageCount = 1;
    let fileType = 'txt';

    // ── A. PDF Extraction ───────────────────────────────────────────────────────
    if (lowerName.endsWith('.pdf') || mimetype === 'application/pdf') {
      fileType = 'pdf';
      try {
        if (typeof pdfParse === 'function') {
          const pdfData = await pdfParse(buffer, { max: 0 });
          extractedText = (pdfData.text || '').trim();
          pageCount = pdfData.numpages || 1;
        } else if (pdfParse.PDFParse) {
          const parser = new pdfParse.PDFParse({ data: buffer });
          await parser.load();
          const textResult = await parser.getText();
          if (typeof textResult === 'string') {
            extractedText = textResult.trim();
          } else if (textResult && Array.isArray(textResult.pages)) {
            extractedText = textResult.pages
              .map((p) => (p.text || '').trim())
              .filter(Boolean)
              .join('\n\n');
            pageCount = textResult.total || textResult.pages.length || 1;
          } else if (textResult && typeof textResult.text === 'string') {
            extractedText = textResult.text.trim();
            pageCount = textResult.total || 1;
          }
          await parser.destroy();
        } else {
          throw new Error('PDF_PARSER_UNAVAILABLE');
        }

        // Clean out synthetic page footers if present (e.g. "-- 1 of 1 --")
        const strippedPdfText = extractedText.replace(/--\s*\d+\s+of\s+\d+\s*--/gi, '').trim();
        const cleanWordCount = (strippedPdfText.match(/\S+/g) || []).length;

        // Check for scanned / image-only PDF (no selectable text or only stray header artifacts)
        if (cleanWordCount === 0 || (cleanWordCount < 5 && pageCount >= 1)) {
          return res.status(422).json({
            status: 'error',
            code: 'SCANNED_PDF_NO_TEXT',
            message:
              'This PDF appears to be a scanned document or image-only file with no selectable text. Optical Character Recognition (OCR) is required to convert scanned images into readable text before AI processing.',
            pageCount,
            fileType,
            filename: originalname,
            fileSize: size,
          });
        }

        extractedText = strippedPdfText;
      } catch (pdfErr) {
        console.error('[DocumentController] PDF parse error:', pdfErr.message);
        return res.status(422).json({
          status: 'error',
          code: 'PDF_PARSE_FAILED',
          message: 'Could not read this PDF document. The file may be password-protected, encrypted, or corrupted.',
        });
      }
    }

    // ── B. Word DOCX Extraction ────────────────────────────────────────────────
    else if (lowerName.endsWith('.docx') || mimetype.includes('wordprocessingml')) {
      fileType = 'docx';
      try {
        const result = await mammoth.extractRawText({ buffer });
        extractedText = (result.value || '').trim();
        // Approximate page count: ~500 words per academic page
        const words = (extractedText.match(/\S+/g) || []).length;
        pageCount = Math.max(1, Math.ceil(words / 500));
      } catch (docxErr) {
        console.error('[DocumentController] DOCX parse error:', docxErr.message);
        return res.status(422).json({
          status: 'error',
          code: 'DOCX_PARSE_FAILED',
          message: 'Could not parse this Word document. Please ensure it is a valid .docx file.',
        });
      }
    }

    // ── C. PowerPoint (.pptx) Extraction ──────────────────────────────────────
    else if (
      lowerName.endsWith('.pptx') ||
      lowerName.endsWith('.ppt') ||
      mimetype.includes('presentationml') ||
      mimetype.includes('ms-powerpoint')
    ) {
      fileType = 'pptx';
      try {
        const pptxResult = await extractPptxText(buffer);
        extractedText = (pptxResult.fullText || '').trim();
        pageCount = pptxResult.slideCount || 1;

        if (pptxResult.isSparse && (!extractedText || extractedText.length === 0)) {
          return res.status(422).json({
            status: 'error',
            code: 'SPARSE_PPTX_NO_TEXT',
            message:
              'This PowerPoint presentation appears to contain only images or diagrams with no selectable text. Optical Character Recognition (OCR) is required to convert slide images into readable text.',
            pageCount,
            fileType,
            filename: originalname,
            fileSize: size,
          });
        }
      } catch (pptxErr) {
        console.error('[DocumentController] PPTX parse error:', pptxErr.message);
        return res.status(422).json({
          status: 'error',
          code: 'PPTX_PARSE_FAILED',
          message: 'Could not parse this PowerPoint presentation. Please ensure it is a valid .pptx file.',
        });
      }
    }

    // ── D. Image File (PNG, JPG, WebP) Extraction ──────────────────────────────
    else if (
      lowerName.endsWith('.png') ||
      lowerName.endsWith('.jpg') ||
      lowerName.endsWith('.jpeg') ||
      lowerName.endsWith('.webp') ||
      mimetype.startsWith('image/')
    ) {
      fileType = 'image';
      extractedText = `[Uploaded Image: ${originalname} (${(size / 1024).toFixed(1)} KB)]`;
      pageCount = 1;
    }

    // ── E. Plain Text (.txt) Extraction ────────────────────────────────────────
    else {
      fileType = 'txt';
      try {
        extractedText = buffer.toString('utf8').trim();
        const words = (extractedText.match(/\S+/g) || []).length;
        pageCount = Math.max(1, Math.ceil(words / 500));
      } catch (txtErr) {
        console.error('[DocumentController] TXT parse error:', txtErr.message);
        return res.status(422).json({
          status: 'error',
          code: 'TXT_PARSE_FAILED',
          message: 'Could not read this text document.',
        });
      }
    }

    // ── F. Validate Extracted Content ──────────────────────────────────────────
    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(422).json({
        status: 'error',
        code: 'EMPTY_DOCUMENT',
        message:
          fileType === 'pptx'
            ? 'This PowerPoint presentation is empty or contains no readable text.'
            : 'The uploaded file is empty or does not contain any readable text.',
      });
    }

    // Normalize whitespace while preserving paragraphs
    const normalizedText = extractedText
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    const wordCount = (normalizedText.match(/\S+/g) || []).length;
    const charCount = normalizedText.length;
    const previewText = normalizedText.slice(0, 1500);

    return res.json({
      status: 'success',
      filename: originalname,
      fileType,
      fileSize: size,
      pageCount,
      wordCount,
      charCount,
      previewText,
      text: normalizedText,
    });

  } catch (err) {
    console.error('[DocumentController] Unexpected read error:', err);
    return res.status(500).json({
      status: 'error',
      code: 'SERVER_ERROR',
      message: 'An unexpected error occurred while reading the document.',
    });
  }
};

// ── 2. Generate Structured Summarized Study Notes ──────────────────────────────
exports.postDocumentSummarize = async (req, res) => {
  try {
    const {
      text,
      filename = 'Uploaded Document',
      depth = 'medium',
      fileType = 'auto',
      isPresentation: reqIsPresentation,
    } = req.body || {};

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        code: 'MISSING_TEXT',
        message: 'Document text is required to generate summarized study notes.',
      });
    }

    if (!isApiKeyConfigured()) {
      return res.status(503).json({
        status: 'error',
        code: 'API_KEY_NOT_CONFIGURED',
        message: 'Gemini API key is not configured on the server. Please check .env settings.',
      });
    }

    const ai = getGenAIClient();
    if (!ai) {
      return res.status(503).json({
        status: 'error',
        code: 'CLIENT_INIT_FAILED',
        message: 'Could not initialize Gemini AI client.',
      });
    }

    // Determine if document is a presentation
    const isPresentation =
      reqIsPresentation === true ||
      fileType === 'pptx' ||
      fileType === 'presentation' ||
      (filename && (filename.toLowerCase().endsWith('.pptx') || filename.toLowerCase().endsWith('.ppt'))) ||
      text.includes('### Slide ');

    // Safe bounds: cap input text at 60,000 characters to keep within fast token budgets
    const cappedText = text.slice(0, 60000);

    let depthGuidance = '';
    if (depth === 'short') {
      depthGuidance = 'Generate concise, high-yield revision notes focusing on the top critical takeaways.';
    } else if (depth === 'detailed') {
      depthGuidance = 'Generate comprehensive, in-depth academic study notes covering all subtopics, nuances, step-by-step mechanisms, and thorough breakdowns.';
    } else {
      depthGuidance = 'Generate standard, balanced academic study notes suitable for college exam preparation.';
    }

    let systemInstruction = '';
    if (isPresentation) {
      systemInstruction = `You are an expert academic curriculum designer, professor, and presentation analyst.
Your task is to analyze the student's uploaded PowerPoint presentation ("${filename}") and produce an authoritative, high-yield, structured 9-part presentation summary.

STRICT ACCURACY RULES:
1. Base all notes strictly and faithfully on the content provided in the presentation slides.
2. DO NOT invent facts, citations, or formulas not present or directly implied by the slides.
3. If diagrams, tables, or formulas are present in the presentation, summarize their meaning accurately.
4. Organize your response into the exact 9 sections specified below, using clean GitHub-flavored Markdown.

FORMAT YOUR NOTES WITH THESE EXACT 9 SECTIONS:
## 1. Presentation Overview
Provide the presentation title, estimated academic subject or topic, and total slide count.

## 2. Overall Summary
Comprehensive executive summary of the entire slide deck, its core thesis, and primary message.

## 3. Slide-by-Slide Explanation
Detailed breakdown preserving slide numbers and topics, explaining the core content of each slide clearly.

## 4. Important Concepts and Definitions
Glossary of all foundational concepts, theoretical definitions, and core terminology presented in the slides.

## 5. Key Examination Points
High-yield concepts, exam questions professors typically formulate from these slides, and critical distinctions.

## 6. Important Formulas and Technical Terms
Any mathematical formulas, algorithmic notation, or specialized technical terms found in the presentation (or state "No explicit mathematical formulas in this presentation.").

## 7. Important Tables and Diagram Descriptions
Descriptions and analyses of tables, diagrams, workflows, or comparisons presented in the slides (or state "No complex tables or diagrams in this slide deck.").

## 8. Possible Viva Questions
5 to 8 challenging oral examination / viva questions based on the deck with concise model answers.

## 9. Short Revision Notes
Condensed rapid-revision bullet points for last-minute exam recall.

Tone: Authoritative, academic, clear, and encouraging for students. Depth guidance: ${depthGuidance}`;
    } else {
      systemInstruction = `You are an expert academic curriculum designer and student notes compiler.
Your task is to analyze the student's uploaded document ("${filename}") and produce a set of high-yield, structured study notes.

STRICT ACCURACY RULES:
1. Base all notes strictly and faithfully on the content provided in the uploaded document.
2. DO NOT invent facts, citations, or formulas not present or directly implied by the document.
3. If formulas or equations are present in the document, preserve their mathematical notation accurately.
4. Organize your response into the exact 9 sections specified below, using clean GitHub-flavored Markdown.

FORMAT YOUR NOTES WITH THESE EXACT 9 SECTIONS:
## 1. Document Overview
A clear 2-3 sentence executive summary explaining what the document is about, its primary subject, and main purpose.

## 2. Topic-wise & Chapter Breakdown
Organize the material into logical chapters or subtopics with bulleted conceptual breakdowns.

## 3. Important Definitions
A bulleted glossary of all key terms and technical vocabulary introduced in the document with clear, simple definitions.

## 4. Key Concepts
Detailed breakdown of the most critical foundational concepts, theories, and mechanisms explained in the document.

## 5. Important Points & Takeaways
Concise, high-yield bullet-point revision takeaways for rapid retention.

## 6. Formulas and Equations
List any formulas, mathematical expressions, or algorithmic rules found in the document. If none are present, state "No explicit mathematical formulas in this document."

## 7. Illustrative Examples
Concrete practical examples, case studies, or walk-throughs provided in the text.

## 8. Important Revision & Exam Questions
5 to 8 challenging study and revision questions that a professor or examiner might ask based on this document (include brief answer hints).

## 9. Quick Revision Cram Sheet
A condensed 60-second summary sheet designed for immediate review before an exam.

Tone: Authoritative, academic, clear, and encouraging for students. Depth guidance: ${depthGuidance}`;
    }

    const userPrompt = `Here is the uploaded document text for "${filename}":\n\n"""\n${cappedText}\n"""\n\nPlease compile the complete 9-section structured study notes.`;

    const preferredModel = getModelName();
    const fallbackModel = getFallbackModelName();

    let notesText = '';
    try {
      const response = await ai.models.generateContent({
        model: preferredModel,
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.3, // Lower temperature for faithful academic notes
        },
      });
      notesText = typeof response.text === 'function' ? response.text() : response.text;
    } catch (modelErr) {
      console.warn(`[DocumentController] Preferred model ${preferredModel} failed, trying fallback ${fallbackModel}:`, modelErr.message);
      const response = await ai.models.generateContent({
        model: fallbackModel,
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });
      notesText = typeof response.text === 'function' ? response.text() : response.text;
    }

    if (!notesText || notesText.trim().length === 0) {
      throw new Error('EMPTY_RESPONSE');
    }

    return res.json({
      status: 'success',
      filename,
      depth,
      isPresentation,
      notes: notesText.trim(),
    });

  } catch (err) {
    console.error('[DocumentController] Summarization error:', String(err).replace(/AIza\S+/g, '[REDACTED]'));
    return res.status(500).json({
      status: 'error',
      code: 'SUMMARIZATION_FAILED',
      message: 'Failed to generate study notes from the document. Please try again.',
    });
  }
};

// ── 3. Chat with Your Document (Q&A with Context Chunking) ────────────────────
exports.postDocumentChat = async (req, res) => {
  try {
    const { question, history = [], documentText, filename = 'Uploaded Document' } = req.body || {};

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        code: 'MISSING_QUESTION',
        message: 'A non-empty question is required.',
      });
    }

    if (!documentText || typeof documentText !== 'string' || documentText.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        code: 'MISSING_DOCUMENT_TEXT',
        message: 'Document context is required to answer questions about this document.',
      });
    }

    if (!isApiKeyConfigured()) {
      return res.status(503).json({
        status: 'error',
        code: 'API_KEY_NOT_CONFIGURED',
        message: 'Gemini API key is not configured on the server.',
      });
    }

    const ai = getGenAIClient();
    if (!ai) {
      return res.status(503).json({
        status: 'error',
        code: 'CLIENT_INIT_FAILED',
        message: 'Could not initialize Gemini AI client.',
      });
    }

    // ── Smart Context Chunking & Relevance Scoring ───────────────────────────
    // If the document is small (<= 25k chars), send the entire document.
    // If the document is large, chunk it into paragraph blocks and score by keyword overlap.
    let relevantContext = '';
    const cleanText = documentText.trim();

    if (cleanText.length <= 25000) {
      relevantContext = cleanText;
    } else {
      // Chunk by double-newlines or sections
      const rawChunks = cleanText.split(/\n\s*\n/);
      const queryWords = question
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 2);

      const slideMatch = question.match(/slide\s*(\d+)/i);
      const targetSlideNum = slideMatch ? parseInt(slideMatch[1], 10) : null;

      // Score chunks by keyword matches
      const scoredChunks = rawChunks.map((chunk, idx) => {
        const lowerChunk = chunk.toLowerCase();
        let score = 0;
        queryWords.forEach((word) => {
          if (lowerChunk.includes(word)) score += 1;
        });
        if (
          targetSlideNum !== null &&
          (lowerChunk.includes(`slide ${targetSlideNum}:`) ||
            lowerChunk.includes(`slide ${targetSlideNum}\n`) ||
            lowerChunk.includes(`slide ${targetSlideNum} `))
        ) {
          score += 100;
        }
        return { chunk, score, idx };
      });

      // Sort by score descending, pick top relevant chunks up to ~22k chars
      scoredChunks.sort((a, b) => b.score - a.score);

      const selected = [];
      let totalLength = 0;
      for (const item of scoredChunks) {
        if (totalLength + item.chunk.length > 22000) break;
        selected.push(item);
        totalLength += item.chunk.length;
      }

      // Re-order selected chunks chronologically so context flows naturally
      selected.sort((a, b) => a.idx - b.idx);
      relevantContext = selected.map((s) => s.chunk).join('\n\n');

      if (!relevantContext || relevantContext.trim().length === 0) {
        // Fallback to first 20,000 characters
        relevantContext = cleanText.slice(0, 20000);
      }
    }

    // ── Build Multi-turn History (Capped at 6 turns) ──────────────────────────
    const sanitizedHistory = [];
    if (Array.isArray(history)) {
      const validRoles = new Set(['user', 'model', 'assistant']);
      history
        .filter((h) => h && validRoles.has(h.role) && typeof h.content === 'string')
        .slice(-8) // last 4 turns
        .forEach((h) => {
          sanitizedHistory.push({
            role: h.role === 'assistant' ? 'model' : h.role,
            parts: [{ text: h.content.slice(0, 2000) }],
          });
        });

      // Ensure history starts with user turn
      while (sanitizedHistory.length > 0 && sanitizedHistory[0].role !== 'user') {
        sanitizedHistory.shift();
      }
    }

    const systemInstruction = `You are StudyMate AI's Document Study Assistant. You are answering student questions about the uploaded document titled "${filename}".

RULES FOR ANSWERING:
1. The uploaded document is your PRIMARY SOURCE OF TRUTH.
2. When answering, cite relevant sections, headings, or topics mentioned in the document.
3. If the answer is directly contained in the document, explain it clearly, simply, and thoroughly.
4. If the question asks about something NOT in the document, explicitly inform the student:
   "This topic is not covered in the uploaded document." Then, if helpful, you may provide a brief supplemental answer clearly marked as [General Supplemental Knowledge].
5. Never invent or hallucinate information claiming it is in the document if it is absent.
6. Format answers with clear headings, bullet points, and code/formula formatting where appropriate.
7. Be encouraging, patient, and academically thorough.`;

    const contextPrefix = `[DOCUMENT CONTEXT FOR "${filename}"]:\n"""\n${relevantContext}\n"""\n\n`;
    const fullUserPrompt = `${contextPrefix}Student Question: ${question.trim()}`;

    const preferredModel = getModelName();
    const fallbackModel = getFallbackModelName();

    let replyText = '';

    const executeChat = async (model) => {
      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction,
          temperature: 0.35,
        },
        history: sanitizedHistory,
      });
      const response = await chat.sendMessage({ message: fullUserPrompt });
      return typeof response.text === 'function' ? response.text() : response.text;
    };

    try {
      replyText = await executeChat(preferredModel);
    } catch (modelErr) {
      console.warn(`[DocumentController] Q&A model ${preferredModel} failed, trying fallback ${fallbackModel}:`, modelErr.message);
      replyText = await executeChat(fallbackModel);
    }

    if (!replyText || replyText.trim().length === 0) {
      throw new Error('EMPTY_RESPONSE');
    }

    return res.json({
      status: 'success',
      filename,
      reply: replyText.trim(),
    });

  } catch (err) {
    console.error('[DocumentController] Q&A error:', String(err).replace(/AIza\S+/g, '[REDACTED]'));
    return res.status(500).json({
      status: 'error',
      code: 'QA_FAILED',
      message: 'Failed to answer question about this document. Please try again.',
    });
  }
};
