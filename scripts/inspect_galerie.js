const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const galStart = html.indexOf('id="galerie"');
if (galStart !== -1) {
  console.log(html.slice(galStart, galStart + 1500));
}
