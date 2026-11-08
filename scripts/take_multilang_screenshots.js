const puppeteer = require('puppeteer-core');

async function testAll() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Desktop French
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/media/authentic_desktop_fr.png', fullPage: true });
  console.log('Saved authentic_desktop_fr.png');

  // 2. Desktop Arabic (RTL)
  await page.evaluate(() => {
    switchLanguage('ar');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'public/media/authentic_desktop_ar.png', fullPage: true });
  console.log('Saved authentic_desktop_ar.png');

  // 3. Mobile Arabic (RTL)
  await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.screenshot({ path: 'public/media/authentic_mobile_ar.png', fullPage: false });
  console.log('Saved authentic_mobile_ar.png');

  // 4. Mobile French
  await page.evaluate(() => {
    switchLanguage('fr');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'public/media/authentic_mobile_fr.png', fullPage: false });
  console.log('Saved authentic_mobile_fr.png');

  await browser.close();
  console.log('All verification screenshots saved successfully!');
}

testAll().catch(console.error);
