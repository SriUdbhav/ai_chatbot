const pdf = require('pdf-parse');

// Generate a valid PDF stream with proper byte counting
function generateSamplePdf(text) {
  const contentStream = `BT /F1 12 Tf 50 700 Td (${text}) Tj ET`;
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

const { PDFParse } = require('pdf-parse');

const samplePdf = generateSamplePdf('Operating Systems: Virtual memory allows multi-tasking.');
console.log('Testing sample PDF with PDFParse 2.x...');

async function testPdf() {
  try {
    const parser = new PDFParse({ data: samplePdf });
    await parser.load();
    const text = await parser.getText();
    const info = await parser.getInfo();
    console.log('Success! Extracted text:', JSON.stringify(text));
    console.log('Total pages:', info ? info.total_pages : 'N/A');
    await parser.destroy();
  } catch (err) {
    console.error('PDF Parse Error:', err);
  }
}

testPdf();
