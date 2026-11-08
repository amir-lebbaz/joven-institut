const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const startIdx = html.indexOf('SUPABASE REAL-TIME INTEGRATION');
console.log(html.slice(startIdx, startIdx + 2000));
