const puppeteer = require('puppeteer-core');
const express = require('express');
const path = require('path');
const http = require('http');

async function testDynamicComparisons() {
  const app = express();
  app.use(express.static(path.join(__dirname, '..', 'public')));
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(3045, resolve));
  console.log('Test server running at http://localhost:3045');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  await page.goto('http://localhost:3045', { waitUntil: 'networkidle0' });

  // Wait 2.5s for Supabase live sync
  await new Promise(r => setTimeout(r, 2500));

  // Check tabs in #baTabsContainer
  const tabsInfo = await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('#baTabsContainer .ba-tab'));
    return tabs.map(tab => ({
      treatment: tab.getAttribute('data-treatment'),
      title: tab.querySelector('.ba-tab-title') ? tab.querySelector('.ba-tab-title').textContent.trim() : '',
      price: tab.querySelector('.ba-tab-price') ? tab.querySelector('.ba-tab-price').textContent.trim() : '',
      icon: tab.querySelector('.ba-tab-icon') ? tab.querySelector('.ba-tab-icon').textContent.trim() : ''
    }));
  });

  console.log('Detected Dynamic Tabs from Supabase:', JSON.stringify(tabsInfo, null, 2));

  if (tabsInfo.length >= 4) {
    console.log(`PASS: Found ${tabsInfo.length} dynamic tabs! (Including user's newly created comparison)`);
  } else {
    console.error(`FAIL: Expected at least 4 tabs, but got ${tabsInfo.length}`);
  }

  // Click on user's newly created tab '100'
  const userTab = tabsInfo.find(t => t.treatment === '100' || t.title.includes('تجربة'));
  if (userTab) {
    console.log(`\nClicking on user created tab [${userTab.treatment}]...`);
    await page.evaluate(treatmentKey => {
      setComparisonTreatment(treatmentKey);
    }, userTab.treatment);
    await new Promise(r => setTimeout(r, 1000));

    const cardDetails = await page.evaluate(() => {
      const bImg = document.getElementById('baImgBefore');
      const aImg = document.getElementById('baImgAfter');
      return {
        cardTitle: document.getElementById('baCardTitle')?.textContent,
        cardDesc: document.getElementById('baCardDesc')?.textContent,
        cardPrice: document.getElementById('baCardPrice')?.textContent,
        beforeSrc: bImg?.src,
        beforeWidth: bImg?.naturalWidth,
        afterSrc: aImg?.src,
        afterWidth: aImg?.naturalWidth
      };
    });

    console.log('Card Details for user comparison:', cardDetails);
    if (cardDetails.beforeWidth > 0 && cardDetails.afterWidth > 0) {
      console.log('PASS: User comparison photos loaded successfully with naturalWidth > 0!');
    } else {
      console.error('FAIL: User comparison photos failed to load!');
    }

    const sliderWrap = await page.$('#avant-apres');
    if (sliderWrap) {
      await sliderWrap.screenshot({ path: 'scripts/user_comparison_verified.png' });
      console.log('Screenshot saved: scripts/user_comparison_verified.png');
    }
  } else {
    console.error('FAIL: User created comparison tab not found!');
  }

  await browser.close();
  server.close();
  console.log('\nDynamic Comparison Test completed successfully!');
}

testDynamicComparisons().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
