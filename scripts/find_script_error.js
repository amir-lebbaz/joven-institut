const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script[\s\S]*?<\/script>/gi)];
const content = scriptMatches[1][0].replace(/<script[^>]*>|<\/script>/gi, '');

const lines = content.split('\n');
console.log('Total lines:', lines.length);

for (let i = 1; i <= lines.length; i++) {
  const code = lines.slice(0, i).join('\n');
  try {
    new Function(code);
  } catch (err) {
    if (!err.message.includes('Unexpected end of input') && !err.message.includes('missing }') && !err.message.includes('Unterminated')) {
      console.log('Error at line', i, ':', err.message);
      console.log('Line content:', lines[i - 1]);
      console.log('Previous lines:', lines.slice(Math.max(0, i - 4), i).join('\n'));
      break;
    }
  }
}
