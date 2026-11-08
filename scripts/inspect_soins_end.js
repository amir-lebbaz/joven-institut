const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const carouselIdx = html.indexOf('id="soinsCarousel"');
const closingSection = html.indexOf('</section>', carouselIdx);
console.log('After carousel:', html.slice(closingSection - 300, closingSection + 50));
