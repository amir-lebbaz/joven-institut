const puppeteer = require('puppeteer-core');
const express = require('express');
const path = require('path');
const http = require('http');

async function runVerification() {
  const app = express();
  app.use(express.static(path.join(__dirname, '..', 'public')));
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(3044, resolve));
  console.log('Test server running at http://localhost:3044');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  // Test 1: Desktop Viewport Overlap Check
  console.log('\n--- 1. Testing Hero on Desktop (1366x768) ---');
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('http://localhost:3044', { waitUntil: 'networkidle0' });

  const desktopOverlap = await page.evaluate(() => {
    const controls = document.querySelector('.hero-video-controls');
    const stat = document.querySelector('.hero-floating-stat');
    if (!controls || !stat) return { error: 'Elements not found' };

    const cRect = controls.getBoundingClientRect();
    const sRect = stat.getBoundingClientRect();

    const isOverlapping = !(
      cRect.right < sRect.left ||
      cRect.left > sRect.right ||
      cRect.bottom < sRect.top ||
      cRect.top > sRect.bottom
    );

    return {
      controlsRect: { top: cRect.top, bottom: cRect.bottom, left: cRect.left, right: cRect.right },
      statRect: { top: sRect.top, bottom: sRect.bottom, left: sRect.left, right: sRect.right },
      verticalGap: sRect.top - cRect.bottom,
      isOverlapping
    };
  });

  console.log('Desktop Overlap Check:', desktopOverlap);
  if (desktopOverlap.isOverlapping) {
    console.error('FAIL: Hero controls and floating stat are overlapping on desktop!');
  } else {
    console.log(`PASS: Zero overlap on desktop! Vertical gap: ${desktopOverlap.verticalGap}px`);
  }

  const heroMediaElem = await page.$('.hero-luxury-frame');
  if (heroMediaElem) {
    await heroMediaElem.screenshot({ path: 'scripts/hero_video_desktop_verified.png' });
    console.log('Screenshot saved: scripts/hero_video_desktop_verified.png');
  }

  // Test 2: Mobile Viewport Overlap Check
  console.log('\n--- 2. Testing Hero on Mobile (390x844 iPhone) ---');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3044', { waitUntil: 'networkidle0' });

  const mobileOverlap = await page.evaluate(() => {
    const controls = document.querySelector('.hero-video-controls');
    const stat = document.querySelector('.hero-floating-stat');
    if (!controls || !stat) return { error: 'Elements not found' };

    const cRect = controls.getBoundingClientRect();
    const sRect = stat.getBoundingClientRect();

    const isOverlapping = !(
      cRect.right < sRect.left ||
      cRect.left > sRect.right ||
      cRect.bottom < sRect.top ||
      cRect.top > sRect.bottom
    );

    return {
      controlsRect: { top: cRect.top, bottom: cRect.bottom, left: cRect.left, right: cRect.right },
      statRect: { top: sRect.top, bottom: sRect.bottom, left: sRect.left, right: sRect.right },
      verticalGap: sRect.top - cRect.bottom,
      isOverlapping
    };
  });

  console.log('Mobile Overlap Check:', mobileOverlap);
  if (mobileOverlap.isOverlapping) {
    console.error('FAIL: Hero controls and floating stat are overlapping on mobile!');
  } else {
    console.log(`PASS: Zero overlap on mobile! Vertical gap: ${mobileOverlap.verticalGap}px`);
  }

  const heroMediaElemMobile = await page.$('.hero-luxury-frame');
  if (heroMediaElemMobile) {
    await heroMediaElemMobile.screenshot({ path: 'scripts/hero_video_mobile_verified.png' });
    console.log('Screenshot saved: scripts/hero_video_mobile_verified.png');
  }

  // Test 3: Before / After Slider Tabs Verification
  console.log('\n--- 3. Testing Before/After Slider Treatment Tabs ---');
  await page.setViewport({ width: 1366, height: 900 });
  await page.goto('http://localhost:3044', { waitUntil: 'networkidle0' });

  // Scroll to comparison section
  await page.evaluate(() => {
    const el = document.getElementById('avant-apres');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));

  const treatments = ['callus', 'cils', 'hydra'];
  for (const t of treatments) {
    console.log(`\nTesting treatment tab: [${t}]`);
    await page.evaluate(treatmentKey => {
      setComparisonTreatment(treatmentKey);
    }, t);
    await new Promise(r => setTimeout(r, 600));

    const imgStatus = await page.evaluate(() => {
      const imgBefore = document.getElementById('baImgBefore');
      const imgAfter = document.getElementById('baImgAfter');
      return {
        beforeSrc: imgBefore ? imgBefore.currentSrc || imgBefore.src : null,
        beforeNaturalWidth: imgBefore ? imgBefore.naturalWidth : 0,
        beforeNaturalHeight: imgBefore ? imgBefore.naturalHeight : 0,
        afterSrc: imgAfter ? imgAfter.currentSrc || imgAfter.src : null,
        afterNaturalWidth: imgAfter ? imgAfter.naturalWidth : 0,
        afterNaturalHeight: imgAfter ? imgAfter.naturalHeight : 0
      };
    });

    console.log(`Status for ${t}:`, imgStatus);
    if (imgStatus.beforeNaturalWidth > 0 && imgStatus.afterNaturalWidth > 0) {
      console.log(`PASS: Both Before and After images loaded successfully for [${t}]!`);
    } else {
      console.error(`FAIL: Images did not load for [${t}]!`);
    }

    const sliderElem = await page.$('#baViewer');
    if (sliderElem) {
      await sliderElem.screenshot({ path: `scripts/slider_${t}_verified.png` });
      console.log(`Screenshot saved: scripts/slider_${t}_verified.png`);
    }
  }

  await browser.close();
  server.close();
  console.log('\nAll verification tests completed!');
}

runVerification().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
