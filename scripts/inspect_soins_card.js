const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const gridStart = html.indexOf('id="soinsCarousel"');
if (gridStart !== -1) {
  console.log(html.slice(gridStart, gridStart + 2000));
}
