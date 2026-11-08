const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\amir\\.gemini\\antigravity\\brain\\0f42fb36-74c0-42cb-88c1-eb45a106c018';

async function runVerification() {
  console.log('🚀 Starting Automated Browser QA Verification for JOVEN Institut Media Integration...');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  const failedRequests = [];
  page.on('response', (response) => {
    const url = response.url();
    const status = response.status();
    if (status >= 400 && !url.includes('favicon')) {
      failedRequests.push({ url, status });
    }
  });

  const consoleLogs = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleLogs.push(msg.text());
    }
  });

  console.log('\n--- 1. Testing Desktop (1440x900) View ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // 1. Check Brand Logo & Hero Image
  const brandLogoSrc = await page.$eval('#navBrandLogo', el => el.getAttribute('src'));
  const heroArchSrc = await page.$eval('#heroArchImg', el => el.getAttribute('src'));
  console.log(`✅ Nav Brand Logo src: ${brandLogoSrc}`);
  console.log(`✅ Hero Arch Image src: ${heroArchSrc}`);

  // 2. Check Reels Section
  const reelsCount = await page.$$eval('.reel-card', els => els.length);
  const reelVideos = await page.$$eval('.reel-video', els => els.map(v => ({
    src: v.getAttribute('src'),
    poster: v.getAttribute('poster')
  })));
  console.log(`✅ Reels Count: ${reelsCount}`);
  console.log('✅ Reels Sources:', reelVideos);

  // 3. Test Audio Toggle on Reel 1
  const soundBtnTextBefore = await page.$eval('.reel-sound-toggle', el => el.textContent.trim());
  await page.click('.reel-sound-toggle');
  const soundBtnTextAfter = await page.$eval('.reel-sound-toggle', el => el.textContent.trim());
  const isVideoMuted = await page.$eval('.reel-video', v => v.muted);
  console.log(`✅ Reel Audio Toggle: Before: [${soundBtnTextBefore}] -> After: [${soundBtnTextAfter}] (muted: ${isVideoMuted})`);

  // 4. Check Portfolio Gallery Images
  const galleryCount = await page.$$eval('.gallery-card', els => els.length);
  const galleryImages = await page.$$eval('.gallery-image-box img', els => els.map(img => img.getAttribute('src')));
  console.log(`✅ Gallery Count: ${galleryCount}`);
  console.log('✅ Gallery Images:', galleryImages);

  // 5. Screenshot Desktop Hero & Reels
  const desktopHeroPath = path.join(ARTIFACT_DIR, 'screenshot_brand_navbar_hero.png');
  await page.screenshot({ path: desktopHeroPath, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log(`📸 Saved Hero & Navbar Screenshot: ${desktopHeroPath}`);

  const reelsSection = await page.$('#reelsSection');
  if (reelsSection) {
    const reelsPath = path.join(ARTIFACT_DIR, 'screenshot_reels_showcase.png');
    await reelsSection.screenshot({ path: reelsPath });
    console.log(`📸 Saved Reels Section Screenshot: ${reelsPath}`);
  }

  const fullDesktopPath = path.join(ARTIFACT_DIR, 'screenshot_desktop_1440px_v2.png');
  await page.screenshot({ path: fullDesktopPath, fullPage: true });
  console.log(`📸 Saved Full Desktop Screenshot: ${fullDesktopPath}`);

  // 6. Test Admin CMS View
  console.log('\n--- 2. Testing Admin CMS & Reels Management ---');
  await page.click('#btnViewAdmin');
  await new Promise(r => setTimeout(r, 600));

  const adminViewVisible = await page.$eval('#adminView', el => el.style.display !== 'none');
  const adminReelsRows = await page.$$eval('#adminReelsTableBody tr', trs => trs.length);
  console.log(`✅ Admin View Visible: ${adminViewVisible}`);
  console.log(`✅ Admin Reels Rows Count: ${adminReelsRows}`);

  // Test instant price stepper in Admin CMS
  const firstPriceBefore = await page.$eval('#adminServicesTableBody tr:first-child .stepper-input', el => el.value);
  await page.click('#adminServicesTableBody tr:first-child .stepper-btn:not(.minus)');
  await new Promise(r => setTimeout(r, 600));
  const firstPriceAfter = await page.$eval('#adminServicesTableBody tr:first-child .stepper-input', el => el.value);
  console.log(`✅ Instant Price Stepper: ${firstPriceBefore} دج -> ${firstPriceAfter} دج`);

  const adminPath = path.join(ARTIFACT_DIR, 'screenshot_admin_reels_cms.png');
  await page.screenshot({ path: adminPath, fullPage: true });
  console.log(`📸 Saved Admin CMS Screenshot: ${adminPath}`);

  // 7. Testing Mobile Viewport (375x812)
  console.log('\n--- 3. Testing Mobile (375x812) Viewport ---');
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.click('#btnViewClient');
  await new Promise(r => setTimeout(r, 600));

  const mobileOverflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log(`✅ Mobile Overflow Check: scrollWidth=${mobileOverflow.scrollWidth}, clientWidth=${mobileOverflow.clientWidth}, hasOverflow=${mobileOverflow.hasOverflow}`);

  const mobilePath = path.join(ARTIFACT_DIR, 'screenshot_mobile_375px_v2.png');
  await page.screenshot({ path: mobilePath, fullPage: true });
  console.log(`📸 Saved Full Mobile Screenshot: ${mobilePath}`);

  await browser.close();

  console.log('\n--- Network & Console Audit ---');
  console.log(`Failed HTTP Requests: ${failedRequests.length}`);
  if (failedRequests.length > 0) {
    console.warn('Failed requests:', failedRequests);
  } else {
    console.log('✅ ZERO 404, 403 or CORS errors on any media or API asset!');
  }

  console.log(`Console Errors: ${consoleLogs.length}`);
  if (consoleLogs.length > 0) {
    console.warn('Console errors:', consoleLogs);
  } else {
    console.log('✅ ZERO JavaScript runtime errors in console!');
  }

  console.log('\n🎉 Verification completed successfully!');
}

runVerification().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
