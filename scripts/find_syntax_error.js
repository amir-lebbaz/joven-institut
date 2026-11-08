const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Extract all <script> blocks and parse them with vm to find the exact line
const vm = require('vm');
const scriptMatches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];

scriptMatches.forEach((m, idx) => {
  try {
    new vm.Script(m[1]);
    console.log(`Script ${idx} OK`);
  } catch (err) {
    console.error(`Script ${idx} ERROR:`, err.message);
    const lines = m[1].split('\n');
    const errLine = err.stack.match(/evalmachine\.<anonymous>:(\d+)/);
    if (errLine) {
      const lineNum = parseInt(errLine[1], 10);
      console.log('Error around line', lineNum, ':');
      for (let i = Math.max(0, lineNum - 5); i < Math.min(lines.length, lineNum + 5); i++) {
        console.log(`${i + 1}: ${lines[i]}`);
      }
    }
  }
});
