const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const headEnd = html.indexOf('</head>');
console.log('Head end at:', headEnd);
console.log(html.slice(headEnd - 300, headEnd));
