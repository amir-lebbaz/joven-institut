const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const filterFn = html.indexOf('function filterServices');
if (filterFn !== -1) {
  console.log(html.slice(filterFn, filterFn + 600));
}
