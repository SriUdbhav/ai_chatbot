const fs = require('fs');
const chatJs = fs.readFileSync('public/js/chat.js', 'utf8');
const chatEjs = fs.readFileSync('views/chat.ejs', 'utf8');

const regex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const missing = new Set();
const found = new Set();

while ((match = regex.exec(chatJs)) !== null) {
  const id = match[1];
  if (!chatEjs.includes(`id="${id}"`) && !chatEjs.includes(`id='${id}'`)) {
    missing.add(id);
  } else {
    found.add(id);
  }
}

console.log('Total IDs found in EJS:', found.size);
console.log('Missing IDs:', Array.from(missing));
