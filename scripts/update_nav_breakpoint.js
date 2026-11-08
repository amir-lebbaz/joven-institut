const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Change @media (max-width: 768px) { :root { --nav-height: 64px; } .nav-menu, ...
const oldBreakpoint = '@media (max-width: 768px) {\n      :root {\n        --nav-height: 64px;\n      }\n\n      .nav-menu,';
const newBreakpoint = '@media (max-width: 1080px) {\n      :root {\n        --nav-height: 64px;\n      }\n\n      .nav-menu,';

if (html.includes(oldBreakpoint)) {
  html = html.replace(oldBreakpoint, newBreakpoint);
  console.log('Updated mobile nav breakpoint from 768px to 1080px!');
  fs.writeFileSync('public/index.html', html, 'utf8');
} else {
  console.log('Old breakpoint string not found as expected.');
}
