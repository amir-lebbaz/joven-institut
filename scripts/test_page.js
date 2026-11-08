const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  console.log('Page loaded. Any errors?', errors.length ? errors : 'None! 100% clean');

  const baSection = await page.$('#avant-apres');
  console.log('Section #avant-apres exists?', !!baSection);

  const tabsCount = await page.$$eval('.ba-tab', tabs => tabs.length);
  console.log('Tabs count:', tabsCount);

  await browser.close();
})();
