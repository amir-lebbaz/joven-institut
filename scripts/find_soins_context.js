const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const idx = html.indexOf('id="soins"');
console.log('Index of id="soins":', idx);
console.log('Snippet before and after 500 chars:');
console.log(html.slice(Math.max(0, idx - 300), Math.min(html.length, idx + 400)));
