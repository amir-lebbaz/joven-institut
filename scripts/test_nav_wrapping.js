const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  const widths = [1440, 1366, 1280, 1200, 1100, 1024];
  for (const w of widths) {
    await page.setViewport({ width: w, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    const items = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.nav-menu .nav-item a')).map(a => ({
        text: a.textContent.trim(),
        w: a.offsetWidth,
        h: a.offsetHeight
      }));
    });
    console.log('--- Viewport: ' + w + 'px ---');
    let hasWrap = false;
    items.forEach(it => {
      if (it.h > 38) {
        console.log('  WRAPPING DETECTED: "' + it.text + '" height=' + it.h + 'px');
        hasWrap = true;
      }
    });
    if (!hasWrap) console.log('  All items single line.');
  }
  await browser.close();
})();
