const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'media', 'callus_more');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body { font-family: sans-serif; background: #111; color: #fff; padding: 10px; }
.grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
.card { background: #222; padding: 4px; border-radius: 6px; text-align: center; }
img { width: 100%; height: 200px; object-fit: cover; }
p { font-size: 11px; margin: 4px 0 0 0; }
</style>
</head>
<body>
<h2>Callus More Samples (${files.length})</h2>
<div class="grid">
${files.map(f => `<div class="card"><img src="/media/callus_more/${f}"><p>${f}</p></div>`).join('')}
</div>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'media', 'callus_more_inspect.html'), html);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1500, height: 2200 });
  await page.goto('http://localhost:3000/media/callus_more_inspect.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'media', 'callus_more_render.jpg'), fullPage: true });
  await browser.close();
  console.log('Rendered callus_more_render.jpg');
})();
