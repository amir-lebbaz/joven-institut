const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const navStart = html.indexOf('<nav');
const navEnd = html.indexOf('</nav>');
console.log(html.slice(navStart, navEnd + 10));
