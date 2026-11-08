const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const stray = `    // Video modal
    const videoModal = document.getElementById('videoModal');
    const modalVideoPlayer = document.getElementById('modalVideoPlayer');

    
    );
    }`;

const clean = `    // Video modal
    const videoModal = document.getElementById('videoModal');
    const modalVideoPlayer = document.getElementById('modalVideoPlayer');`;

if (html.includes(stray)) {
  html = html.replace(stray, clean);
  fs.writeFileSync('public/index.html', html, 'utf8');
  console.log('Removed stray closing tokens successfully!');
} else {
  console.log('Could not find exact stray string, looking for fragment...');
  html = html.replace(/\s*\);\s*\}\s*function openVideoModal/g, '\n\n    function openVideoModal');
  fs.writeFileSync('public/index.html', html, 'utf8');
  console.log('Replaced fragment.');
}
