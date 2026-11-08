const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  const widths = [1920, 1440, 1366, 1280, 1200, 1100, 1050, 1024, 992];
  for (const w of widths) {
    await page.setViewport({ width: w, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.addStyleTag({ content: `
      .nav-menu { gap: 4px !important; }
      .nav-item a { padding: 6px 10px !important; font-size: 0.84rem !important; white-space: nowrap !important; }
      .header-inner { gap: 10px !important; }
    ` });

    const data = await page.evaluate(() => {
      const headerInner = document.querySelector('.header-inner');
      const items = Array.from(document.querySelectorAll('.nav-menu .nav-item a')).map(a => ({
        text: a.textContent.trim(),
        h: a.clientHeight
      }));
      const anyWrapped = items.some(it => it.h > 36);
      return {
        headerInnerW: headerInner.offsetWidth,
        headerInnerScrollW: headerInner.scrollWidth,
        isOverflow: headerInner.scrollWidth > headerInner.offsetWidth,
        anyWrapped
      };
    });
    console.log('Width ' + w + 'px: overflow=' + data.isOverflow + ', anyWrapped=' + data.anyWrapped);
  }
  await browser.close();
})();
