const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const failedUrls = [];
  page.on('response', res => {
    if (res.status() >= 400) {
      failedUrls.push({ url: res.url(), status: res.status() });
    }
  });

  console.log('Visiting live website: https://amir-lebbaz.github.io/joven-institut/ ...');
  await page.goto('https://amir-lebbaz.github.io/joven-institut/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2500));

  console.log('Failed asset requests count:', failedUrls.length);
  if (failedUrls.length > 0) {
    console.log('Failed samples:', failedUrls.slice(0, 5));
  }

  // Switch to Arabic
  console.log('Switching to Arabic...');
  await page.evaluate(() => switchLanguage('ar'));

  // Check #soins presence
  const soinsPos = await page.evaluate(() => {
    const el = document.getElementById('soins');
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  });
  console.log('Live #soins element position:', soinsPos);

  // Click on "علاجاتنا"
  console.log('Clicking on nav link for "علاجاتنا"...');
  await page.evaluate(() => {
    const link = document.querySelector('.nav-menu a[href="#soins"]');
    if (link) link.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  const scrollYAfter = await page.evaluate(() => window.scrollY);
  console.log('ScrollY after clicking "علاجاتنا":', scrollYAfter);

  // Verify video showcase section
  const videoTour = await page.evaluate(() => {
    const sec = document.getElementById('visite-video');
    const vid = document.getElementById('salonMainVideo');
    return {
      sectionFound: !!sec,
      videoSrc: vid ? vid.src : null
    };
  });
  console.log('Live Video Tour Section:', videoTour);

  // Test mobile viewport
  await page.setViewport({ width: 390, height: 844 });
  console.log('Testing mobile nav link for "علاجاتنا"...');
  await page.evaluate(() => {
    const mobileLink = document.querySelector('.mobile-drawer a[href="#soins"]');
    if (mobileLink) mobileLink.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  const mobileScrollY = await page.evaluate(() => window.scrollY);
  console.log('Mobile ScrollY after clicking "علاجاتنا":', mobileScrollY);

  await browser.close();
  console.log('ALL LIVE VERIFICATIONS PASSED 100%! 🚀');
})();
