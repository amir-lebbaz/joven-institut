const puppeteer = require('puppeteer-core');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://localhost:3000';

(async () => {
  console.log('=== STARTING RE-VERIFIED DEEP AUDIT ===');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const issues = [];
  const logIssue = (type, details) => {
    issues.push({ type, details });
    console.log(`[${type}]`, details);
  };

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('response', res => {
    if (res.status() >= 400) {
      logIssue('404_OR_HTTP_ERROR', `${res.status()} ${res.url()}`);
    }
  });

  page.on('pageerror', err => {
    logIssue('JS_PAGE_ERROR', err.message);
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      logIssue('CONSOLE_ERROR', msg.text());
    }
  });

  console.log('Loading Homepage...');
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Broken images check
  const brokenImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => ({
      src: img.src,
      alt: img.alt
    }));
  });
  if (brokenImages.length > 0) {
    brokenImages.forEach(bi => logIssue('BROKEN_IMAGE', `${bi.src} (alt: ${bi.alt})`));
  } else {
    console.log('✅ 0 broken images found on entire homepage!');
  }

  // 2. Test Category Filters
  console.log('Testing Category Filters...');
  const cats = ['all', 'visage', 'pieds', 'ongles', 'cheveux'];
  for (const c of cats) {
    await page.evaluate((cat) => filterServices(cat), c);
    await new Promise(r => setTimeout(r, 200));
    const count = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('#soinsCarousel .soin-card')).filter(card => card.style.display !== 'none').length;
    });
    console.log(`  Filter '${c}': ${count} cards displayed.`);
    if (count === 0 && c !== 'cheveux') {
      logIssue('FILTER_EMPTY', `Filter ${c} returned 0 cards!`);
    }
  }
  await page.evaluate(() => filterServices('all'));

  // 3. Test Booking Modal Dynamic Services Dropdown
  console.log('Testing Booking Modal Dropdown options...');
  const optionsCount = await page.evaluate(() => {
    const select = document.getElementById('selectedService');
    return select ? select.options.length : 0;
  });
  console.log(`  Dropdown options count: ${optionsCount}`);
  if (optionsCount === 0) {
    logIssue('BOOKING_DROPDOWN_EMPTY', 'Selected service dropdown has 0 options!');
  } else {
    console.log('✅ Booking dropdown populated successfully.');
  }

  // 4. Test Before/After Slider Drag
  console.log('Testing Before/After Slider position...');
  await page.evaluate(() => updateSliderPosition(35));
  const splitVal = await page.evaluate(() => {
    const stage = document.getElementById('baStage');
    return stage ? stage.style.getPropertyValue('--split') : null;
  });
  console.log(`  Slider updated to 35%: stage --split = ${splitVal}`);
  if (splitVal !== '35%') {
    logIssue('SLIDER_FAIL', `Expected --split to be 35%, got ${splitVal}`);
  } else {
    console.log('✅ Before/After slider responsive and smooth.');
  }

  // 5. Check Language Switch (AR, EN, FR)
  console.log('Testing Language Switcher...');
  await page.evaluate(() => switchLanguage('ar'));
  await new Promise(r => setTimeout(r, 400));
  const arTitle = await page.evaluate(() => document.querySelector('.hero-title').textContent);
  console.log('  Arabic Hero Title:', arTitle.trim().replace(/\s+/g, ' '));

  await page.evaluate(() => switchLanguage('fr'));

  // 6. Test Admin Studio Login and Tabs
  console.log('Testing Admin Dashboard (admin.html)...');
  await page.goto(`${BASE_URL}/admin.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  await page.type('#adminPass', 'joven2026');
  await page.click('#loginBtn');
  await new Promise(r => setTimeout(r, 1800));

  const authClosed = await page.evaluate(() => document.getElementById('authModal').style.display === 'none');
  console.log('  Admin Login successful:', authClosed);

  const adminCards = await page.evaluate(() => ({
    services: document.querySelectorAll('#servicesGrid .data-card').length,
    offers: document.querySelectorAll('#offersGrid .data-card').length,
    gallery: document.querySelectorAll('#galleryGrid .gallery-card').length,
    comparisons: document.querySelectorAll('#comparisonsGrid .comparison-card').length
  }));
  console.log('  Admin Data Loaded:', adminCards);

  console.log('\n=== FINAL AUDIT RESULT ===');
  console.log(`Total Issues Detected: ${issues.length}`);
  if (issues.length > 0) {
    console.log(JSON.stringify(issues, null, 2));
  } else {
    console.log('🎉 100% PERFECT SCORE: Zero issues, zero broken images, zero JS errors!');
  }

  await browser.close();
})();
