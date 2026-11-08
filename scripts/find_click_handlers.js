const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const regex = /document\.(querySelectorAll|getElementById)\(['"]a[^\)]*|addEventListener\(['"]click['"]/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  const start = Math.max(0, match.index - 100);
  const end = Math.min(html.length, match.index + 300);
  console.log('--- CLICK HANDLER AT', match.index, ':');
  console.log(html.slice(start, end));
}
