const puppeteer = require('puppeteer-core');
const path = require('path');

async function testRender() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Desktop Screenshot
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/media/screenshot_desktop.png', fullPage: false });
  console.log('Saved desktop screenshot to public/media/screenshot_desktop.png');

  // 2. Mobile iPhone 14 Pro Screenshot
  await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/media/screenshot_mobile.png', fullPage: false });
  console.log('Saved mobile screenshot to public/media/screenshot_mobile.png');

  await browser.close();
}

testRender().catch(console.error);
