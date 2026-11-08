const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const target = 'SECTION: NOS SOINS';
const idx = html.indexOf(target);
console.log(html.slice(idx - 100, idx + 400));
