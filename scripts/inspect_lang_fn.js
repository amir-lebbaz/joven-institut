const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const langFn = html.indexOf('function switchLanguage');
if (langFn !== -1) {
  console.log(html.slice(langFn, langFn + 1200));
}
