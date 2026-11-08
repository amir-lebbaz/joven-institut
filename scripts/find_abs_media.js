const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const absoluteMedia = [...html.matchAll(/["']\/media\/([^"']+)["']/g)];
console.log('Absolute /media/ paths count:', absoluteMedia.length);
for (let i = 0; i < Math.min(10, absoluteMedia.length); i++) {
  console.log('  ', absoluteMedia[i][0]);
}
