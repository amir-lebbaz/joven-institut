const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];
const lines = scriptMatches[0][1].split('\n');
for (let i = 1; i < 40; i++) {
  console.log(`${i}: ${lines[i-1]}`);
}
