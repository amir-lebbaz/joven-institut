const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.addStyleTag({ content: '.nav-menu { gap: 4px !important; } .nav-item a { padding: 6px 10px !important; font-size: 0.84rem !important; white-space: nowrap !important; }' });
  
  const items = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.nav-menu .nav-item a')).map(a => ({
      text: a.textContent.trim(),
      h: a.clientHeight,
      w: a.offsetWidth,
      lh: getComputedStyle(a).lineHeight,
      pad: getComputedStyle(a).padding
    }));
  });
  console.log(items);
  await browser.close();
})();
