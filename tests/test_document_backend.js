/**
 * Test Suite for Document Reader & AI Study Notes Backend APIs
 */

const assert = require('assert');

const BASE_URL = 'http://localhost:3000';

const sampleTextContent = `Chapter 3: Data Structures and Algorithms - Binary Search Trees

1. Overview
A Binary Search Tree (BST) is a hierarchical node-based data structure where each node has at most two children, referred to as the left child and the right child.

2. Core Invariant (BST Property)
For every node X:
- All keys in the left subtree of X are strictly less than X.key.
- All keys in the right subtree of X are strictly greater than X.key.

3. Time Complexity
- Search: Average O(log n), Worst Case O(n) when unbalanced (skewed tree).
- Insertion: Average O(log n), Worst Case O(n).
- Deletion: Average O(log n), Worst Case O(n).
Formula for height of balanced BST: h = floor(log2(n)).

4. Important Definitions
- Root: The topmost node of the tree without any parent.
- Leaf: A node with no children (degree 0).
- In-order Traversal: Visiting left subtree, root, then right subtree. Produces sorted order.

5. Revision Questions
1. Why does an unbalanced BST degrade to O(n) search time?
2. How does an AVL tree or Red-Black tree guarantee O(log n) worst-case height?
3. Show the resulting BST after inserting keys: 50, 30, 70, 20, 40, 60, 80.`;

// Helper to generate a valid PDF stream with proper byte offsets
function generateSamplePdf(text) {
  const contentStream = text ? `BT /F1 12 Tf 50 700 Td (${text}) Tj ET` : `q 1 0 0 1 Q`;
  const streamLength = Buffer.byteLength(contentStream, 'utf8');

  let body = `%PDF-1.4\n`;
  const offsets = [];

  function addObj(str) {
    offsets.push(Buffer.byteLength(body, 'utf8'));
    body += str + '\n';
  }

  addObj(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`);
  addObj(`2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj`);
  addObj(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj`);
  addObj(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${contentStream}\nendstream\nendobj`);
  addObj(`5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`);

  const xrefOffset = Buffer.byteLength(body, 'utf8');
  let xref = `xref\n0 6\n0000000000 65535 f \n`;
  for (let i = 0; i < 5; i++) {
    xref += String(offsets[i]).padStart(10, '0') + ` 00000 n \n`;
  }
  xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(body + xref, 'utf8');
}

// Minimal valid PDF with selectable text
const validPdfBuffer = generateSamplePdf('Computer Networks: The OSI Model has seven layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.');

// Minimal valid PDF with NO text (scanned page simulation)
const scannedPdfBuffer = generateSamplePdf('');


async function test(name, fn) {
  try {
    await fn();
    console.log(`✅ ${name}`);
  } catch (err) {
    console.error(`❌ ${name}:`, err.message);
    throw err;
  }
}

async function uploadFile(filename, buffer, mimeType) {
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  const header = `--${boundary}\r\nContent-Disposition: form-data; name="document"; filename="${filename}"\r\nContent-Type: ${mimeType}\r\n\r\n`;
  const footer = `\r\n--${boundary}--\r\n`;

  const payload = Buffer.concat([
    Buffer.from(header, 'utf8'),
    buffer,
    Buffer.from(footer, 'utf8')
  ]);

  const res = await fetch(`${BASE_URL}/api/document/read`, {
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`
    },
    body: payload
  });

  return { status: res.status, data: await res.json() };
}

async function run() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🧪  Document Reader & AI Notes Backend Verification Suite');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // Test 1: Upload TXT file
  await test('Text Extraction: TXT file upload and word count', async () => {
    const { status, data } = await uploadFile('dsa_bst.txt', Buffer.from(sampleTextContent, 'utf8'), 'text/plain');
    assert.strictEqual(status, 200);
    assert.strictEqual(data.status, 'success');
    assert.strictEqual(data.fileType, 'txt');
    assert.strictEqual(data.filename, 'dsa_bst.txt');
    assert.ok(data.wordCount > 50, 'Word count should be > 50');
    assert.ok(data.text.includes('Binary Search Tree'), 'Extracted text should include BST');
  });

  // Test 2: Upload PDF file with selectable text
  await test('Text Extraction: PDF file with selectable text', async () => {
    const { status, data } = await uploadFile('osi_model.pdf', validPdfBuffer, 'application/pdf');
    if (status !== 200) {
      console.log('Upload PDF returned:', status, data);
    }
    assert.strictEqual(status, 200);
    assert.strictEqual(data.status, 'success');
    assert.strictEqual(data.fileType, 'pdf');
    assert.strictEqual(data.pageCount, 1);
    assert.ok(data.text.includes('OSI Model'), 'PDF text should include OSI Model');
  });

  // Test 3: Upload Scanned PDF (no selectable text) -> clear OCR error
  await test('Error Handling: Scanned PDF without selectable text yields OCR warning', async () => {
    const { status, data } = await uploadFile('scanned_image.pdf', scannedPdfBuffer, 'application/pdf');
    assert.strictEqual(status, 422);
    assert.strictEqual(data.code, 'SCANNED_PDF_NO_TEXT');
    assert.ok(data.message.includes('OCR'), 'Message should explicitly mention OCR');
  });

  // Test 4: Unsupported file format
  await test('Error Handling: Unsupported file format (.exe / .png)', async () => {
    const { status, data } = await uploadFile('script.exe', Buffer.from('MZ...'), 'application/x-msdownload');
    assert.strictEqual(status, 400);
    assert.strictEqual(data.code, 'UNSUPPORTED_FILE_TYPE');
  });

  // Test 5: Empty document error
  await test('Error Handling: Empty file rejected with clear error', async () => {
    const { status, data } = await uploadFile('empty.txt', Buffer.from('   '), 'text/plain');
    assert.strictEqual(status, 422);
    assert.strictEqual(data.code, 'EMPTY_DOCUMENT');
  });

  // Test 6: AI Summarization with 9 structured sections
  await test('AI Study Notes: Generates structured 9-part notes via Gemini API', async () => {
    const res = await fetch(`${BASE_URL}/api/document/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: sampleTextContent,
        filename: 'dsa_bst.txt',
        depth: 'medium'
      })
    });
    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.status, 'success');
    assert.ok(data.notes.length > 200, 'Notes should be thorough');
    // Check for some key required sections
    assert.ok(data.notes.toLowerCase().includes('overview'), 'Notes should contain Overview');
    assert.ok(data.notes.toLowerCase().includes('definitions') || data.notes.toLowerCase().includes('definition'), 'Notes should contain Definitions');
    assert.ok(data.notes.toLowerCase().includes('concepts') || data.notes.toLowerCase().includes('concept'), 'Notes should contain Concepts');
  });

  // Test 7: Q&A on uploaded document
  await test('Document Q&A: Answers student question citing document context', async () => {
    const res = await fetch(`${BASE_URL}/api/document/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: 'What is the worst-case search time of an unbalanced BST and what is the formula for height?',
        history: [],
        documentText: sampleTextContent,
        filename: 'dsa_bst.txt'
      })
    });
    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.status, 'success');
    assert.ok(data.reply.includes('O(n)'), 'Answer should cite O(n) worst case');
    assert.ok(data.reply.toLowerCase().includes('log'), 'Answer should cite log formula');
  });

  // Test 8: Q&A on topic NOT in document
  await test('Document Q&A: Explicitly states when a question is not covered in the document', async () => {
    const res = await fetch(`${BASE_URL}/api/document/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: 'What is the capital of Australia and who was the first prime minister?',
        history: [],
        documentText: sampleTextContent,
        filename: 'dsa_bst.txt'
      })
    });
    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.status, 'success');
    assert.ok(
      data.reply.toLowerCase().includes('not covered') ||
      data.reply.toLowerCase().includes('not mentioned') ||
      data.reply.toLowerCase().includes('not found') ||
      data.reply.toLowerCase().includes('document does not'),
      'AI must state topic is not covered in the document'
    );
  });

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('🎉 ALL DOCUMENT BACKEND API TESTS PASSED (8/8)!');
  console.log('═══════════════════════════════════════════════════════════════\n');
}

run().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
