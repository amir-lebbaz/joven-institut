const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

let idx = 0;
while ((idx = html.indexOf('id="soins"', idx)) !== -1) {
  console.log('Occurrence at index:', idx);
  console.log(html.slice(Math.max(0, idx - 150), Math.min(html.length, idx + 200)));
  idx += 10;
}
