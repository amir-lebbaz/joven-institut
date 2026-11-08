const fs = require('fs');
const html = fs.readFileSync('public/admin.html', 'utf8');

const galModalIdx = html.indexOf('id="galleryModal"');
console.log(html.slice(galModalIdx, galModalIdx + 1000));
