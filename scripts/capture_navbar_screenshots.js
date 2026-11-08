const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. French with "À propos" active (simulating user screenshot)
  await page.evaluate(() => {
    switchLanguage('fr');
    document.querySelectorAll('.nav-item').forEach(it => it.classList.remove('active'));
    const aboutItem = Array.from(document.querySelectorAll('.nav-item')).find(it => it.querySelector('a[href="#apropos"]'));
    if (aboutItem) aboutItem.classList.add('active');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scripts/navbar_fr_fixed.png', clip: { x: 0, y: 0, width: 1366, height: 90 } });

  // 2. English
  await page.evaluate(() => {
    switchLanguage('en');
    document.querySelectorAll('.nav-item').forEach(it => it.classList.remove('active'));
    const servItem = Array.from(document.querySelectorAll('.nav-item')).find(it => it.querySelector('a[href="#soins"]'));
    if (servItem) servItem.classList.add('active');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scripts/navbar_en_fixed.png', clip: { x: 0, y: 0, width: 1366, height: 90 } });

  // 3. Arabic
  await page.evaluate(() => {
    switchLanguage('ar');
    document.querySelectorAll('.nav-item').forEach(it => it.classList.remove('active'));
    const servItem = Array.from(document.querySelectorAll('.nav-item')).find(it => it.querySelector('a[href="#soins"]'));
    if (servItem) servItem.classList.add('active');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scripts/navbar_ar_fixed.png', clip: { x: 0, y: 0, width: 1366, height: 90 } });

  console.log('Screenshots captured successfully!');
  await browser.close();
})();
