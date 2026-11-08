const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  const info = await page.evaluate(() => {
    const link = document.querySelector('.nav-item a[href="#apropos"]');
    const cs = getComputedStyle(link);
    const parent = link.parentElement;
    const parentCs = getComputedStyle(parent);
    const navMenu = document.querySelector('.nav-menu');
    const navMenuCs = getComputedStyle(navMenu);
    return {
      linkText: link.textContent,
      linkWidth: cs.width,
      linkHeight: cs.height,
      linkPadding: cs.padding,
      whiteSpace: cs.whiteSpace,
      display: cs.display,
      parentWidth: parentCs.width,
      parentFlex: parentCs.flex,
      navMenuWidth: navMenuCs.width,
      navMenuFlexWrap: navMenuCs.flexWrap,
      navMenuGap: navMenuCs.gap
    };
  });
  console.log(info);
  await browser.close();
})();
