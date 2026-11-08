const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const bodyEnd = html.lastIndexOf('</body>');
console.log('Total length:', html.length, 'Body end at:', bodyEnd);
console.log(html.slice(Math.max(0, bodyEnd - 800), bodyEnd));
