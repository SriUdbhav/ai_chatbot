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
const {
  isApiKeyConfigured,
  getGenAIClient,
  getModelName,
  getFallbackModelName,
} = require('../config/gemini');

// ── Multer In-Memory Storage Configuration ─────────────────────────────────────
// Uses memoryStorage to avoid leaving orphaned files on disk.
// Strict 10MB limit and file filter for PDF, DOCX, and TXT.
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
  ];
  const ext = (file.originalname || '').toLowerCase();
  const hasValidExt = ext.endsWith('.pdf') || ext.endsWith('.docx') || ext.endsWith('.txt');

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
          message: 'Unsupported file format. Please upload a PDF (.pdf), Word (.docx), or Text (.txt) file.',
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

    // ── C. Plain Text (.txt) Extraction ────────────────────────────────────────
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

    // ── D. Validate Extracted Content ──────────────────────────────────────────
    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(422).json({
        status: 'error',
        code: 'EMPTY_DOCUMENT',
        message: 'The uploaded file is empty or does not contain any readable text.',
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
    const { text, filename = 'Uploaded Document', depth = 'medium' } = req.body || {};

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

    const systemInstruction = `You are an expert academic curriculum designer and student notes compiler.
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

      // Score chunks by keyword matches
      const scoredChunks = rawChunks.map((chunk, idx) => {
        const lowerChunk = chunk.toLowerCase();
        let score = 0;
        queryWords.forEach((word) => {
          if (lowerChunk.includes(word)) score += 1;
        });
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
