const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const regex = /<a[^>]*href=["']#soins["'][^>]*>[\s\S]*?<\/a>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  const start = Math.max(0, match.index - 150);
  const end = Math.min(html.length, match.index + 200);
  console.log('--- LINK AT', match.index, ':');
  console.log(html.slice(start, end));
}
