const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const nextClose = html.indexOf('-->', 67971);
console.log('Next --> found at:', nextClose);
console.log(html.slice(nextClose - 100, nextClose + 100));
