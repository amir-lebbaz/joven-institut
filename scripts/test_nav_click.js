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

  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));

  // Check failed assets
  console.log('Failed asset requests count:', failedUrls.length);
  if (failedUrls.length > 0) {
    console.log('Failed:', failedUrls.slice(0, 5));
  }

  // Switch to Arabic
  console.log('Switching to Arabic...');
  await page.evaluate(() => switchLanguage('ar'));

  // Get position of #soins
  const soinsPos = await page.evaluate(() => {
    const el = document.getElementById('soins');
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  });
  console.log('Position of #soins in page:', soinsPos);

  // Click on "علاجاتنا"
  console.log('Clicking on nav link for soins...');
  await page.evaluate(() => {
    const link = document.querySelector('.nav-menu a[href="#soins"]');
    if (link) link.click();
  });

  await new Promise(r => setTimeout(r, 1000));

  const scrollYAfter = await page.evaluate(() => window.scrollY);
  console.log('ScrollY after click:', scrollYAfter);

  // Verify video section
  const videoExists = await page.evaluate(() => {
    const sec = document.getElementById('visite-video');
    const vid = document.getElementById('salonMainVideo');
    return {
      sectionFound: !!sec,
      videoSrc: vid ? vid.src : null
    };
  });
  console.log('Video Tour Section:', videoExists);

  // Take screenshot of the video showcase
  const videoSec = await page.$('#visite-video');
  if (videoSec) {
    await videoSec.screenshot({ path: 'public/media/video_tour_preview.jpg' });
    console.log('Screenshot of video tour saved to public/media/video_tour_preview.jpg');
  }

  // Take screenshot of #soins
  const soinsSec = await page.$('#soins');
  if (soinsSec) {
    await soinsSec.screenshot({ path: 'public/media/soins_preview.jpg' });
    console.log('Screenshot of soins section saved to public/media/soins_preview.jpg');
  }

  await browser.close();
  console.log('Verification completed successfully! ✨');
})();
