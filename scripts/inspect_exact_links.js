const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.nav-menu .nav-item a')).map(a => ({
      text: a.textContent,
      html: a.innerHTML,
      outerHTML: a.outerHTML,
      scrollHeight: a.scrollHeight,
      clientHeight: a.clientHeight,
      offsetWidth: a.offsetWidth,
      inlineStyle: a.getAttribute('style')
    }));
  });
  console.log(JSON.stringify(links, null, 2));
  await browser.close();
})();
