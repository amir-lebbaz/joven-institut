const fs = require('fs');
let content = fs.readFileSync('public/index.html', 'utf8');

const target = "link.setAttribute('href', currentHref.replace(/wa.me/[0-9]+/, 'wa.me/' + waNum));";
const replacement = "link.setAttribute('href', currentHref.replace(/wa\\.me\\/\\d+/, 'wa.me/' + waNum));";

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('public/index.html', content, 'utf8');
  console.log('Fixed target string successfully!');
} else {
  console.log('Target string not found, looking for nearby text...');
  const idx = content.indexOf('currentHref.replace');
  if (idx !== -1) {
    console.log(content.slice(idx - 40, idx + 80));
    content = content.slice(0, idx) + "currentHref.replace(/wa\\.me\\/\\d+/, 'wa.me/' + waNum));" + content.slice(content.indexOf(';', idx) + 1);
    fs.writeFileSync('public/index.html', content, 'utf8');
    console.log('Fixed nearby syntax error.');
  }
}
