const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function extract() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=2400,1600']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 2400, height: 1600 });

  const uploadedPath = 'C:/Users/amir/.gemini/antigravity/brain/db0a0c12-17dd-4ce0-bf3d-2e50e2a0d5de/.user_uploaded/media_1794134878640_88a66266.jpg';
  const fileUrl = 'file:///' + path.resolve(uploadedPath).replace(/\\/g, '/');

  await page.goto(fileUrl, { waitUntil: 'load' });

  const dimensions = await page.evaluate(() => {
    const img = document.querySelector('img');
    return {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      width: img.width,
      height: img.height
    };
  });

  console.log('Image natural dimensions:', dimensions);

  // We can create high quality crops using HTML5 Canvas inside page
  const crops = [
    // 1. Hero right image: Aesthetician treating client
    // In desktop view (left ~74% of the image is desktop preview, right ~26% is phone)
    // Desktop layout has hero image on upper right
    {
      name: 'hero_specialist.jpg',
      // Coordinates in original image (width x height)
      calc: (W, H) => ({
        x: Math.round(W * 0.365),
        y: Math.round(H * 0.085),
        w: Math.round(W * 0.345),
        h: Math.round(H * 0.340)
      })
    },
    // 2. Card 1: Hydrafacial
    {
      name: 'card_hydrafacial.jpg',
      calc: (W, H) => ({
        x: Math.round(W * 0.058),
        y: Math.round(H * 0.483),
        w: Math.round(W * 0.155),
        h: Math.round(H * 0.120)
      })
    },
    // 3. Card 2: Manucure & Pédicure
    {
      name: 'card_manucure.jpg',
      calc: (W, H) => ({
        x: Math.round(W * 0.225),
        y: Math.round(H * 0.483),
        w: Math.round(W * 0.150),
        h: Math.round(H * 0.120)
      })
    },
    // 4. Card 3: Callus Peeling / Eye
    {
      name: 'card_callus.jpg',
      calc: (W, H) => ({
        x: Math.round(W * 0.388),
        y: Math.round(H * 0.483),
        w: Math.round(W * 0.150),
        h: Math.round(H * 0.120)
      })
    },
    // 5. Card 4: Soins Capillaires / Hair
    {
      name: 'card_capillaires.jpg',
      calc: (W, H) => ({
        x: Math.round(W * 0.550),
        y: Math.round(H * 0.483),
        w: Math.round(W * 0.150),
        h: Math.round(H * 0.120)
      })
    },
    // 6. Reception Desk (About section)
    {
      name: 'about_reception.jpg',
      calc: (W, H) => ({
        x: Math.round(W * 0.018),
        y: Math.round(H * 0.697),
        w: Math.round(W * 0.275),
        h: Math.round(H * 0.220)
      })
    },
    // 7. Botanical leaf on top left
    {
      name: 'leaf_decor_left.png',
      calc: (W, H) => ({
        x: Math.round(W * 0.018),
        y: Math.round(H * 0.110),
        w: Math.round(W * 0.060),
        h: Math.round(H * 0.240)
      })
    },
    // 8. Botanical leaf on bottom right
    {
      name: 'leaf_decor_right.png',
      calc: (W, H) => ({
        x: Math.round(W * 0.672),
        y: Math.round(H * 0.685),
        w: Math.round(W * 0.065),
        h: Math.round(H * 0.230)
      })
    }
  ];

  const outputDir = path.resolve('public/media/design');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const c of crops) {
    const coords = c.calc(dimensions.naturalWidth, dimensions.naturalHeight);
    const dataUrl = await page.evaluate((cCoords) => {
      const img = document.querySelector('img');
      const canvas = document.createElement('canvas');
      canvas.width = cCoords.w;
      canvas.height = cCoords.h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, cCoords.x, cCoords.y, cCoords.w, cCoords.h, 0, 0, cCoords.w, cCoords.h);
      return canvas.toDataURL('image/jpeg', 0.95);
    }, coords);

    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const outPath = path.join(outputDir, c.name);
    fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
    console.log(`Saved ${c.name} (${coords.w}x${coords.h}) to ${outPath}`);
  }

  await browser.close();
  console.log('Finished extracting design crops!');
}

extract().catch(console.error);
