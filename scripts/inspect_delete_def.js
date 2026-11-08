const fs = require('fs');
const html = fs.readFileSync('public/admin.html', 'utf8');

const regex = /async function (delete\w+|save\w+)/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(`\n=================== ${match[1]} ===================`);
  console.log(html.slice(match.index, match.index + 500));
}
