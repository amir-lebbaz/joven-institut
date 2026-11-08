const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const sections = [...html.matchAll(/<section[^>]*id=["']([^"']+)["'][^>]*>/g)].map(m => m[1]);
console.log('Sections:', sections);
