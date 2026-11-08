const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const soinsStart = html.indexOf('id="soins"');
if (soinsStart !== -1) {
  console.log(html.slice(soinsStart, soinsStart + 1500));
} else {
  console.log('soins not found');
}
