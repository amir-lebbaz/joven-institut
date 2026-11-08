const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const matches = [...html.matchAll(/(nav_services|Nos Soins|soins)/gi)];
console.log('Matches count:', matches.length);
for (const m of matches) {
  const start = Math.max(0, m.index - 100);
  const end = Math.min(html.length, m.index + 150);
  console.log('--- Context:', html.slice(start, end));
}
