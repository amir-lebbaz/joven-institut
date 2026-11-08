const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body>
        <video id="vid" src="http://localhost:3000/media/authentic/video_welcome.mp4" controls></video>
      </body>
    </html>
  `);
  
  await page.waitForFunction(() => {
    const v = document.getElementById('vid');
    return v && v.videoWidth > 0;
  }, { timeout: 10000 });

  const info = await page.evaluate(() => {
    const v = document.getElementById('vid');
    return { w: v.videoWidth, h: v.videoHeight, dur: v.duration };
  });

  console.log('Video dimensions:', info);
  await browser.close();
})();
