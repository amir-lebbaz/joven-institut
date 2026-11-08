const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://amir-lebbaz.github.io/joven-institut/', { waitUntil: 'domcontentloaded' });
  
  const sections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section')).map(s => ({
      id: s.id,
      className: s.className,
      outerSnippet: s.outerHTML.slice(0, 100)
    }));
  });

  console.log('Sections on live page:', sections);
  await browser.close();
})();
