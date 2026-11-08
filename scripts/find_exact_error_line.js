const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script[\s\S]*?<\/script>/gi)];
const content = scriptMatches[1][0].replace(/<script[^>]*>|<\/script>/gi, '');

// Use Acorn or Esprima or simple regex to find syntax error line
// Or we can run node with eval and print the stack trace!
try {
  eval(content);
} catch (e) {
  console.log('Error name:', e.name);
  console.log('Error message:', e.message);
  console.log('Stack:', e.stack);
}
