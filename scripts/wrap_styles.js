const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const rawMarker = '/* ============================================================\n       HIGH-END LUXURY HERO VIDEO & FEMININE ANIMATIONS';
if (html.includes(rawMarker)) {
  // Check if already in style
  const beforeMarker = html.slice(html.indexOf(rawMarker) - 50, html.indexOf(rawMarker));
  if (!beforeMarker.includes('<style')) {
    html = html.replace(rawMarker, '<style id="luxuryHeroStyles">\n' + rawMarker);
    html = html.replace('</head>', '</style>\n</head>');
    fs.writeFileSync('public/index.html', html, 'utf8');
    console.log('Successfully wrapped luxury styles in <style id="luxuryHeroStyles">!');
  } else {
    console.log('Already wrapped in <style>');
  }
}
