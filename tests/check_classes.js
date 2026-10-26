const fs = require('fs');
const ejs = fs.readFileSync('views/chat.ejs', 'utf8');
const chatCss = fs.readFileSync('public/css/chat.css', 'utf8');
const styleCss = fs.readFileSync('public/css/style.css', 'utf8');

const classMatches = ejs.matchAll(/class=['"]([^'"]+)['"]/g);
const inChatCss = new Set();
const inStyleOnly = new Set();
const inNeither = new Set();

for (const m of classMatches) {
  const classes = m[1].split(/\s+/).filter(Boolean);
  for (const c of classes) {
    if (c.includes('<%')) continue;
    const inChat = chatCss.includes('.' + c);
    const inStyle = styleCss.includes('.' + c);
    if (inChat) {
      inChatCss.add(c);
    } else if (inStyle) {
      inStyleOnly.add(c);
    } else {
      inNeither.add(c);
    }
  }
}

console.log('Classes in chat.css:', inChatCss.size);
console.log('Classes ONLY in style.css:', Array.from(inStyleOnly));
console.log('Classes in neither:', Array.from(inNeither));
