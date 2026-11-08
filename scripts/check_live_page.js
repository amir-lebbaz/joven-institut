(async () => {
  const res = await fetch('https://amir-lebbaz.github.io/joven-institut/?t=' + Date.now());
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Has SVG placeholder:', text.includes('data:image/svg+xml'));
  console.log('Has dynamic whatsapp:', text.includes('window.SALON_WHATSAPP'));
})();
