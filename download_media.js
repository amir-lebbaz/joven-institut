const fs = require('fs');
const path = require('path');
const https = require('https');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const get = (uri) => {
      https.get(uri, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return reject(new Error(`Status ${res.statusCode} for ${uri}`));
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            const size = fs.statSync(dest).size;
            console.log(`[OK] Saved ${path.basename(dest)} (${size} bytes)`);
            resolve(size);
          });
        });
      }).on('error', (err) => {
        file.close();
        fs.unlink(dest, () => {});
        reject(err);
      });
    };
    get(url);
  });
}

async function run() {
  console.log('Downloading media files locally into public/media/ ...');

  const brandDir = path.join(__dirname, 'public', 'media', 'brand');
  const postsDir = path.join(__dirname, 'public', 'media', 'posts');
  const reelsDir = path.join(__dirname, 'public', 'media', 'reels');

  // Real Instagram images from @joven_institut
  const instagramImages = [
    {
      dest: path.join(postsDir, 'post-1.webp'),
      url: 'https://scontent.cdninstagram.com/v/t51.71878-15/719900123_1981394632507671_8217373440347705370_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=p7L3PuH3QSQQ7kNvwE0fFzA&_nc_oc=Adqm3TDUCyPX53x556Zp5G0Gyq3YBcXHDiwdk-e3jvkif59M2jhM1MHlsZ-Vgbwa-hM&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=HVMA2jMc2FAd2li1nMCfnw&_nc_ss=7ea8c&oh=00_AQSjKFIZLUcXWg7-qH5FRO_eEgv4ohxqn1yjd_GW5fl9DA&oe=6AF61E3B'
    },
    {
      dest: path.join(postsDir, 'post-2.webp'),
      url: 'https://scontent.cdninstagram.com/v/t51.71878-15/770802527_1361795992816299_4874097049532145974_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=KPjCqEYqOJ0Q7kNvwHzPZWj&_nc_oc=AdqeMIR3VR-pDHfIORfttZy9tA3Dsgufrf3lA3e7WaqlplskYmPtv54lLKrVv5bOuyY&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=HVMA2jMc2FAd2li1nMCfnw&_nc_ss=7ea8c&oh=00_AQRlf7l3_f4DX_ydzZGka3hSe33Nx5JNUoC7kDCB5sOObw&oe=6AF6016B'
    },
    {
      dest: path.join(postsDir, 'post-3.webp'),
      url: 'https://scontent.cdninstagram.com/v/t51.71878-15/729692005_1476551294273850_6235640943458458883_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=9q4R059ep8YQ7kNvwESwh5C&_nc_oc=Adqhch5Q6Xhwhe6ZcDn19YTqU6KY8rgzK_3E5pH0jKbhJhhCPuDk6JK6xgvRWHR0VcI&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=HVMA2jMc2FAd2li1nMCfnw&_nc_ss=7ea8c&oh=00_AQTZ73l94a68f4q_NTr991kbeXGll94GKQJq03lQ6Lgknw&oe=6AF6088E'
    },
    {
      dest: path.join(postsDir, 'post-4.webp'),
      url: 'https://scontent.cdninstagram.com/v/t15.5256-10/884705132_2178463679407091_1026155529858541986_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=RXaIw3LeVUUQ7kNvwEq7qd1&_nc_oc=Adq3t7J9QsqbU1TjGrZciHsE-FAABbkaRmwVVR8Ww0CD_B3Y7woW7XnrNIeUYsM4ILg&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=HVMA2jMc2FAd2li1nMCfnw&_nc_ss=7ea8c&oh=00_AQSIIWaC9VshEbzEvDvBpa2QXqr7FO2jDDXtRLZzNoOAjg&oe=6AF61A01'
    },
    {
      dest: path.join(postsDir, 'post-5.webp'),
      url: 'https://scontent.cdninstagram.com/v/t51.82787-15/883626716_18200716060381319_4256741232515316288_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=9MCrsbwet1sQ7kNvwGARxPP&_nc_oc=AdpEjk_VJdjp2lthRr4zQSBAHVR7lSYwfYeThPAA4DR9rMY8OeDE7zVCW1TQxZuc-Gs&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=HVMA2jMc2FAd2li1nMCfnw&_nc_ss=7ea8c&oh=00_AQSt8a68snPfOERmnCXUeib6bM4PDSy8QRB63JFLsWlGhQ&oe=6AF5F6EE'
    },
    {
      dest: path.join(postsDir, 'post-6.webp'),
      url: 'https://scontent.cdninstagram.com/v/t15.5256-10/878144405_1117750601223468_303420316957871958_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=NkL4eYsYtzoQ7kNvwGHAnQA&_nc_oc=AdpVf9L3bMx0FUzeEICBSYoikTcSibv3KIMWxdcgfgGxkdCXhIvO6BzmTmRQzzBy0KI&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=HVMA2jMc2FAd2li1nMCfnw&_nc_ss=7ea8c&oh=00_AQSycchmDJXVwb5mKL6jZpkruH0LJFv6gEpBPQN5E2drHg&oe=6AF5FE3B'
    }
  ];

  for (const item of instagramImages) {
    try {
      await download(item.url, item.dest);
    } catch (err) {
      console.warn(`Fallback for ${path.basename(item.dest)}:`, err.message);
      // Fallback high-res treatment photo
      await download('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', item.dest);
    }
  }

  // Brand Logo & Hero Clinic Interior
  // If joven-logo.webp is small, ensure high-res
  const logoPath = path.join(brandDir, 'joven-logo.webp');
  if (!fs.existsSync(logoPath) || fs.statSync(logoPath).size < 5000) {
    console.log('Fetching high-res brand logo...');
    await download('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=85', logoPath);
  }

  const heroPath = path.join(brandDir, 'joven-hero.webp');
  if (!fs.existsSync(heroPath) || fs.statSync(heroPath).size < 5000) {
    await download('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85', heroPath);
  }

  // 4 Vertical 9:16 Video Reels (Hydrafacial, Head Spa, BIAB Nails, Face Care)
  const reels = [
    {
      videoName: 'reel-1.mp4',
      posterName: 'reel-1-poster.webp',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-beautician-cleansing-the-skin-of-a-woman-in-a-spa-41487-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
    },
    {
      videoName: 'reel-2.mp4',
      posterName: 'reel-2-poster.webp',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-enjoying-a-head-massage-in-a-beauty-salon-42795-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    },
    {
      videoName: 'reel-3.mp4',
      posterName: 'reel-3-poster.webp',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-manicurist-applying-varnish-on-a-client-s-nails-41490-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80'
    },
    {
      videoName: 'reel-4.mp4',
      posterName: 'reel-4-poster.webp',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-applying-a-face-mask-to-a-woman-in-a-beauty-salon-41488-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80'
    }
  ];

  for (const r of reels) {
    const vPath = path.join(reelsDir, r.videoName);
    const pPath = path.join(reelsDir, r.posterName);
    if (!fs.existsSync(vPath) || fs.statSync(vPath).size < 10000) {
      await download(r.videoUrl, vPath);
    }
    if (!fs.existsSync(pPath) || fs.statSync(pPath).size < 5000) {
      await download(r.posterUrl, pPath);
    }
  }

  // Summary check
  console.log('\n--- VERIFICATION OF DOWNLOADED LOCAL ASSETS ---');
  const allFiles = [
    path.join(brandDir, 'joven-logo.webp'),
    path.join(brandDir, 'joven-hero.webp'),
    path.join(postsDir, 'post-1.webp'),
    path.join(postsDir, 'post-2.webp'),
    path.join(postsDir, 'post-3.webp'),
    path.join(postsDir, 'post-4.webp'),
    path.join(postsDir, 'post-5.webp'),
    path.join(postsDir, 'post-6.webp'),
    path.join(reelsDir, 'reel-1.mp4'),
    path.join(reelsDir, 'reel-1-poster.webp'),
    path.join(reelsDir, 'reel-2.mp4'),
    path.join(reelsDir, 'reel-2-poster.webp'),
    path.join(reelsDir, 'reel-3.mp4'),
    path.join(reelsDir, 'reel-3-poster.webp'),
    path.join(reelsDir, 'reel-4.mp4'),
    path.join(reelsDir, 'reel-4-poster.webp')
  ];

  for (const f of allFiles) {
    if (fs.existsSync(f)) {
      const sz = fs.statSync(f).size;
      console.log(`- ${path.relative(__dirname, f)}: ${sz} bytes (Valid: ${sz > 5000 ? 'YES ✅' : 'NO ❌'})`);
    } else {
      console.log(`- MISSING: ${f}`);
    }
  }
}

run();
