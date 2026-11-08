const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const footerStart = html.indexOf('<footer');
if (footerStart !== -1) {
  console.log(html.slice(footerStart, footerStart + 1200));
}
