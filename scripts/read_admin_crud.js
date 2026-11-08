const fs = require('fs');
const html = fs.readFileSync('public/admin.html', 'utf8');

const startIdx = html.indexOf('// SERVICES CRUD');
console.log(html.slice(startIdx));
