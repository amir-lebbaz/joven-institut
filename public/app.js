/**
 * JOVEN Institut de Beauté et Soins (Hydra, Alger)
 * $30,000 USD Agency-Grade Multi-Page Web Platform
 * Full-Stack JavaScript & Real-Time SQLite Sync Controller
 */

// Application State
const state = {
  settings: {
    whatsapp_number: '213781088061',
    address: 'Chemin de la Madeleine, 27, Hydra, Alger',
    rating: '4.8',
    reviews_count: '264',
    admin_pin: '1234',
    logo_url: '/media/brand/joven-logo.webp',
    hero_image_url: '/media/brand/joven-hero.webp',
    instagram_handle: '@joven_institut',
    instagram_url: 'https://www.instagram.com/joven_institut/'
  },
  services: [],
  gallery: [],
  reels: [],
  highlights: [],
  instagram_posts: [],
  faqs: [],
  currentPage: 'home', // 'home', 'services', 'instagram-hub', 'skin-and-spa', 'mariage-vip', 'reservation-contact'
  currentCategory: 'الكل',
  currentFeedFilter: 'الكل',
  currentView: 'client', // 'client' or 'admin'
  isPinLocked: false,
  adminSearchTerm: '',
  clientSearchTerm: '',
  selectedPackage: [], // Custom package builder cart
  activeHighlightIndex: 0,
  storyTimer: null
};

// --------------------------------------------------------------------------
// Utilities
// --------------------------------------------------------------------------
function formatDZD(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '';
  return Number(amount).toLocaleString('fr-DZ') + ' دج';
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : '⚠️'}</span> <span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3200);
}

function formatPhoneDisplay(number) {
  if (number.startsWith('213')) {
    const local = '0' + number.slice(3);
    return local.replace(/(\d{4})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  }
  return number;
}

// --------------------------------------------------------------------------
// Multi-Page SPA Client Router
// --------------------------------------------------------------------------
const pageMap = {
  'home': 'pageHome',
  'services': 'pageServices',
  'instagram-hub': 'pageInstagramHub',
  'skin-and-spa': 'pageSkinAndSpa',
  'mariage-vip': 'pageMariageVip',
  'reservation-contact': 'pageReservationContact'
};

function navigateTo(pageName, updateHash = true) {
  if (!pageMap[pageName]) pageName = 'home';
  state.currentPage = pageName;

  // Ensure client view is visible
  if (state.currentView !== 'client') {
    switchView('client');
  }

  // Hide all pages, show target page
  Object.values(pageMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const activePageEl = document.getElementById(pageMap[pageName]);
  if (activePageEl) {
    activePageEl.style.display = 'block';
  }

  // Update Nav links active state
  document.querySelectorAll('.nav-link-btn').forEach(btn => {
    if (btn.getAttribute('data-page') === pageName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (updateHash) {
    window.location.hash = pageName === 'home' ? '/' : `/${pageName}`;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Page specific renders if needed
  if (pageName === 'home') {
    renderHomeHighlights();
    renderBentoPrices();
    renderHomeReels();
    renderHomeFeedPreview();
  } else if (pageName === 'services') {
    renderCategoryTabs();
    renderServicesGrid();
    renderPackageDrawer();
  } else if (pageName === 'instagram-hub') {
    renderIgHubHighlights();
    renderIgHubReels();
    renderInstagramFeed();
  } else if (pageName === 'reservation-contact') {
    populateWizardServices();
    renderFaqsAccordion();
  }
}

function handleHashChange() {
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  const page = hash || 'home';
  navigateTo(page, false);
}

// --------------------------------------------------------------------------
// API Fetchers
// --------------------------------------------------------------------------
async function fetchBootstrapData() {
  try {
    const res = await fetch('/api/bootstrap');
    const json = await res.json();
    if (json.success && json.data) {
      state.settings = { ...state.settings, ...json.data.settings };
      state.services = json.data.services || [];
      state.gallery = json.data.gallery || [];
      state.reels = json.data.reels || [];
      state.highlights = json.data.highlights || [];
      state.instagram_posts = json.data.instagram_posts || [];
      state.faqs = json.data.faqs || [];

      renderAll();
    } else {
      showToast('تعذر جلب البيانات من الخادم', 'error');
    }
  } catch (err) {
    console.error('Fetch bootstrap error:', err);
    showToast('فشل الاتصال بالخادم', 'error');
  }
}

// --------------------------------------------------------------------------
// View (Client / Admin) & PIN Management
// --------------------------------------------------------------------------
function switchView(viewName) {
  if (viewName === 'admin' && state.isPinLocked && state.currentView !== 'admin') {
    openPinModal();
    return;
  }

  state.currentView = viewName;
  const clientView = document.getElementById('clientView');
  const adminView = document.getElementById('adminView');
  const btnClient = document.getElementById('btnViewClient');
  const btnAdmin = document.getElementById('btnViewAdmin');

  if (viewName === 'client') {
    clientView.style.display = 'block';
    adminView.style.display = 'none';
    btnClient.classList.add('active');
    btnAdmin.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigateTo(state.currentPage || 'home', false);
  } else {
    clientView.style.display = 'none';
    adminView.style.display = 'block';
    btnClient.classList.remove('active');
    btnAdmin.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderAdminView();
  }
}

function togglePinLockMode() {
  state.isPinLocked = !state.isPinLocked;
  const btn = document.getElementById('pinToggleBtn');
  const text = document.getElementById('pinToggleText');

  if (state.isPinLocked) {
    btn.classList.add('locked');
    text.textContent = '🔒 وضع القفل مفعّل (PIN: 1234)';
    showToast('تم تفعيل وضع القفل السري للإنتاج (PIN: 1234)');
  } else {
    btn.classList.remove('locked');
    text.textContent = '🔓 وضع العرض (بدون كلمة سر)';
    showToast('تم تفعيل وضع العرض التجريبي المباشر للمالكة');
  }
}

function openPinModal() {
  const modal = document.getElementById('pinModal');
  const input = document.getElementById('pinInput');
  const err = document.getElementById('pinError');
  err.textContent = '';
  input.value = '';
  modal.classList.add('active');
  setTimeout(() => input.focus(), 100);
}

function closePinModal() {
  document.getElementById('pinModal')?.classList.remove('active');
}

function submitPin() {
  const input = document.getElementById('pinInput');
  const err = document.getElementById('pinError');
  const pin = input.value.trim();
  const correctPin = state.settings.admin_pin || '1234';

  if (pin === correctPin) {
    closePinModal();
    switchView('admin');
    showToast('تم تسجيل الدخول بنجاح إلى لوحة الإدارة');
  } else {
    err.textContent = 'الرمز السري غير صحيح. يرجى إدخال 1234';
  }
}

// --------------------------------------------------------------------------
// Live Working Hours Checker (Hydra Time)
// --------------------------------------------------------------------------
function updateLiveOpenStatus() {
  const pill = document.getElementById('liveOpenStatus');
  if (!pill) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeNum = hour + minute / 60;

  let isOpen = false;
  let closingTime = '17:00';

  if (day === 5) {
    // Friday: Closed
    isOpen = false;
  } else if (day === 0) {
    // Sunday: 09:00 - 19:00
    isOpen = timeNum >= 9 && timeNum < 19;
    closingTime = '19:00';
  } else if (day === 3) {
    // Wednesday: 09:00 - 12:00
    isOpen = timeNum >= 9 && timeNum < 12;
    closingTime = '12:00';
  } else {
    // Sat, Mon, Tue, Thu: 09:00 - 17:00
    isOpen = timeNum >= 9 && timeNum < 17;
    closingTime = '17:00';
  }

  if (isOpen) {
    pill.className = 'info-pill status-open-pill open';
    pill.innerHTML = `<span class="pulse-dot"></span> مفتوح الآن في حيدرة (حتى ${closingTime})`;
  } else {
    pill.className = 'info-pill status-open-pill closed';
    pill.innerHTML = `<span class="pulse-dot"></span> مغلق حالياً • الحجز متاح 24/7 عبر الواتساب`;
  }
}

// --------------------------------------------------------------------------
// Client Multi-Page Global Renderers
// --------------------------------------------------------------------------
function renderClientGlobal() {
  updateLiveOpenStatus();

  const wa = state.settings.whatsapp_number || '213781088061';
  const cleanWa = wa.replace(/\D/g, '');

  // Brand assets
  const navBrandLogo = document.getElementById('navBrandLogo');
  if (navBrandLogo && state.settings.logo_url) navBrandLogo.src = state.settings.logo_url;

  const heroArchImg = document.getElementById('heroArchImg');
  if (heroArchImg && state.settings.hero_image_url) heroArchImg.src = state.settings.hero_image_url;

  // WhatsApp Links
  const navWaLink = document.getElementById('navWaLink');
  if (navWaLink) navWaLink.href = `https://wa.me/${cleanWa}?text=${encodeURIComponent('مرحباً معهد JOVEN، أود الاستفسار وحجز موعد في حيدرة.')}`;

  const heroWaDirect = document.getElementById('heroWaDirect');
  if (heroWaDirect) heroWaDirect.href = `https://wa.me/${cleanWa}?text=${encodeURIComponent('مرحباً معهد JOVEN حيدرة، أود حجز موعد مباشر لجلسة عناية.')}`;

  const footerWaBtn = document.getElementById('footerWaBtn');
  if (footerWaBtn) {
    footerWaBtn.href = `https://wa.me/${cleanWa}?text=${encodeURIComponent('مرحباً معهد JOVEN، أود حجز موعد.')}`;
    footerWaBtn.textContent = `💬 حجز عبر الواتساب: ${formatPhoneDisplay(cleanWa)}`;
  }

  // Meta & Addresses
  const heroRatingText = document.getElementById('heroRatingText');
  if (heroRatingText) heroRatingText.textContent = `${state.settings.rating || '4.8'} / 5`;

  const heroReviewsText = document.getElementById('heroReviewsText');
  if (heroReviewsText) heroReviewsText.textContent = `(+${state.settings.reviews_count || '264'} تقييم موثق على Google Maps)`;

  const footerAddressText = document.getElementById('footerAddressText');
  if (footerAddressText) footerAddressText.textContent = state.settings.address || 'Chemin de la Madeleine, 27, Hydra, Alger';

  const homeInstaHandle = document.getElementById('homeInstaHandle');
  if (homeInstaHandle) homeInstaHandle.textContent = state.settings.instagram_handle || '@joven_institut';
}

// --------------------------------------------------------------------------
// PAGE 1: Master Homepage Renderers
// --------------------------------------------------------------------------
function renderHomeHighlights() {
  const track = document.getElementById('highlightsBubblesTrack');
  if (!track) return;

  let html = '';
  state.highlights.forEach((hl, idx) => {
    html += `
      <div class="highlight-bubble-item" onclick="openStoryViewer(${idx})">
        <div class="highlight-ring">
          <img src="${hl.cover_url}" alt="${hl.title}" class="highlight-avatar">
        </div>
        <span class="highlight-name">${hl.title}</span>
        <span class="highlight-count">${hl.stories_count} ستوري</span>
      </div>
    `;
  });

  track.innerHTML = html;
}

function renderBentoPrices() {
  const hydra = state.services.find(s => s.title.includes('Hydrafacial Prestige'));
  if (hydra) {
    const featuredPrice = document.getElementById('heroFeaturedPrice');
    const featuredOldPrice = document.getElementById('heroFeaturedOldPrice');
    if (featuredPrice) featuredPrice.textContent = formatDZD(hydra.price);
    if (featuredOldPrice) featuredOldPrice.textContent = hydra.old_price ? formatDZD(hydra.old_price) : '';
  }
}

function renderHomeReels() {
  const grid = document.getElementById('homeReelsGrid');
  if (!grid) return;

  const cleanWa = (state.settings.whatsapp_number || '213781088061').replace(/\D/g, '');

  let html = '';
  state.reels.forEach(r => {
    const waText = `مرحباً معهد JOVEN حيدرة، شاهدت فيديو جلسة: "${r.title}" (${r.category}) وأود حجز موعد لهذه الجلسة.`;
    const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waText)}`;

    html += `
      <div class="reel-card" data-reel-id="${r.id}">
        <div class="reel-video-wrapper">
          <video class="reel-video" src="${r.video_url}" poster="${r.poster_url || ''}" loop playsinline muted autoplay></video>
          <button type="button" class="reel-sound-toggle" onclick="toggleReelSound(${r.id}, this)" title="كتم/تشغيل الصوت">
            <span class="sound-icon">🔇</span>
          </button>
          <div class="reel-tag-overlay">${r.category}</div>
        </div>
        <div class="reel-info-glass">
          <h4 class="reel-title">${r.title}</h4>
          <div class="reel-actions">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-wa reel-book-btn">
              <span>💬</span> حجز هذا العلاج
            </a>
            ${r.instagram_permalink ? `<a href="${r.instagram_permalink}" target="_blank" rel="noopener noreferrer" class="reel-insta-btn" title="مشاهدة على إنستغرام">📸 Reel</a>` : ''}
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

function toggleReelSound(id, btn) {
  const card = document.querySelector(`.reel-card[data-reel-id="${id}"]`);
  if (!card) return;
  const video = card.querySelector('video');
  if (!video) return;

  if (video.muted) {
    video.muted = false;
    btn.innerHTML = '<span class="sound-icon">🔊</span>';
    btn.title = 'كتم الصوت';
  } else {
    video.muted = true;
    btn.innerHTML = '<span class="sound-icon">🔇</span>';
    btn.title = 'تشغيل الصوت';
  }
}

function renderHomeFeedPreview() {
  const grid = document.getElementById('homeFeedGrid');
  if (!grid) return;

  // First 6 posts
  const posts = state.instagram_posts.slice(0, 6);
  let html = '';
  posts.forEach(p => {
    html += `
      <div class="ig-post-card" onclick="openPostDetail(${p.id})">
        <img src="${p.image_url}" alt="${p.title}" class="ig-post-img" loading="lazy">
        <div class="ig-post-overlay">
          <div class="ig-post-meta-top">
            <span>${p.category}</span>
            <span>❤️ ${p.likes_count}</span>
          </div>
          <p class="ig-post-caption-snippet">${p.caption}</p>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

// --------------------------------------------------------------------------
// PAGE 2: Services Menu & Package Calculator
// --------------------------------------------------------------------------
function renderCategoryTabs() {
  const container = document.getElementById('categoryTabs');
  if (!container) return;

  const categories = [
    'الكل',
    '🔥 العروض الخاصة',
    'العناية بالبشرة',
    'الشعر والسبا',
    'الأظافر والتجميل',
    'الرموش والحواجب',
    'باقات العرائس'
  ];

  let html = '';
  for (const cat of categories) {
    let count = 0;
    if (cat === 'الكل') {
      count = state.services.length;
    } else if (cat === '🔥 العروض الخاصة') {
      count = state.services.filter(s => s.is_promo === 1).length;
    } else {
      count = state.services.filter(s => s.category === cat).length;
    }

    const isActive = state.currentCategory === cat ? 'active' : '';
    html += `
      <button type="button" class="tab-btn ${isActive}" onclick="setCategory('${cat}')">
        <span>${cat}</span>
        <span class="tab-badge">${count}</span>
      </button>
    `;
  }

  container.innerHTML = html;
}

function setCategory(cat) {
  state.currentCategory = cat;
  renderCategoryTabs();
  renderServicesGrid();
}

function filterClientServices() {
  state.clientSearchTerm = (document.getElementById('clientSearchInput')?.value || '').toLowerCase().trim();
  renderServicesGrid();
}

function renderServicesGrid() {
  const container = document.getElementById('servicesGrid');
  if (!container) return;

  let filtered = state.services;
  if (state.currentCategory === '🔥 العروض الخاصة') {
    filtered = state.services.filter(s => s.is_promo === 1);
  } else if (state.currentCategory !== 'الكل') {
    filtered = state.services.filter(s => s.category === state.currentCategory);
  }

  if (state.clientSearchTerm) {
    filtered = filtered.filter(s =>
      s.title.toLowerCase().includes(state.clientSearchTerm) ||
      s.description.toLowerCase().includes(state.clientSearchTerm) ||
      s.category.toLowerCase().includes(state.clientSearchTerm)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #fff; border-radius: 16px; border: 1px solid var(--border);">
        <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 12px;">لم يتم العثور على أي خدمة تطابق بحثكِ.</p>
        <button class="btn btn-sm btn-outline-gold" onclick="document.getElementById('clientSearchInput').value=''; filterClientServices();">عرض جميع الخدمات</button>
      </div>
    `;
    return;
  }

  const cleanWa = (state.settings.whatsapp_number || '213781088061').replace(/\D/g, '');

  let html = '';
  for (const s of filtered) {
    const isPromo = s.is_promo === 1;
    const oldPriceHtml = (isPromo && s.old_price && s.old_price > s.price)
      ? `<span class="price-old">${formatDZD(s.old_price)}</span>`
      : '';

    const promoRibbon = isPromo
      ? `<div class="service-ribbon">🔥 عرض خاص</div>`
      : '';

    const isInCart = state.selectedPackage.some(item => item.id === s.id);
    const waText = `مرحباً معهد JOVEN، أود حجز موعد لخدمة: ${s.title} (المدة: ${s.duration}) - السعر: ${formatDZD(s.price)}. يرجى تأكيد المواعيد المتاحة لي في حيدرة.`;
    const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waText)}`;

    html += `
      <article class="service-card ${isPromo ? 'is-promo' : ''}">
        ${promoRibbon}
        <div class="service-meta-top">
          <span class="service-category-tag">${s.category}</span>
          <span class="service-duration-badge">⏱️ ${s.duration}</span>
        </div>
        <h3 class="service-title">${s.title}</h3>
        <p class="service-description">${s.description}</p>
        <div class="service-footer">
          <div class="service-price-block">
            <span class="price-main">${formatDZD(s.price)}</span>
            ${oldPriceHtml}
          </div>
          <div class="service-actions-row">
            <button type="button" class="btn-add-package ${isInCart ? 'in-cart' : ''}" onclick="toggleServiceInPackage(${s.id})">
              ${isInCart ? '✓ في باقتك' : '➕ باقة مخصصة'}
            </button>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="service-wa-btn">
              <span>💬</span> حجز فوري
            </a>
          </div>
        </div>
      </article>
    `;
  }

  container.innerHTML = html;
}

function toggleServiceInPackage(id) {
  const service = state.services.find(s => s.id === id);
  if (!service) return;

  const existsIdx = state.selectedPackage.findIndex(s => s.id === id);
  if (existsIdx !== -1) {
    state.selectedPackage.splice(existsIdx, 1);
    showToast(`تمت إزالة "${service.title}" من باقتك`);
  } else {
    state.selectedPackage.push(service);
    showToast(`تمت إضافة "${service.title}" إلى باقتك المخصصة ✨`);
    openPackageDrawer();
  }

  renderServicesGrid();
  renderPackageDrawer();
}

function removePackageItem(id) {
  state.selectedPackage = state.selectedPackage.filter(s => s.id !== id);
  renderServicesGrid();
  renderPackageDrawer();
}

function clearPackage() {
  state.selectedPackage = [];
  renderServicesGrid();
  renderPackageDrawer();
  showToast('تم تفريغ الباقة');
}

function togglePackageDrawer() {
  document.getElementById('packageDrawer')?.classList.toggle('open');
}

function openPackageDrawer() {
  document.getElementById('packageDrawer')?.classList.add('open');
}

function renderPackageDrawer() {
  const count = state.selectedPackage.length;
  const countBadge = document.getElementById('packageCountBadge');
  const drawerItemCount = document.getElementById('drawerItemCount');
  const drawerList = document.getElementById('packageDrawerList');
  const totalPriceEl = document.getElementById('packageTotalPrice');
  const packageWaBtn = document.getElementById('packageWaBtn');

  if (countBadge) countBadge.textContent = count;
  if (drawerItemCount) drawerItemCount.textContent = `${count} خدمات`;

  if (!drawerList) return;

  if (count === 0) {
    drawerList.innerHTML = `<p class="drawer-empty-msg">لم تقومي بإضافة أي خدمات بعد.<br>اضغطي على "➕ باقة مخصصة" لتجميع خدماتك في باقة واحدة والحصول على حجز متكامل!</p>`;
    if (totalPriceEl) totalPriceEl.textContent = '0 دج';
    if (packageWaBtn) {
      packageWaBtn.style.opacity = '0.5';
      packageWaBtn.style.pointerEvents = 'none';
      packageWaBtn.href = '#';
    }
    return;
  }

  let total = 0;
  let html = '';
  state.selectedPackage.forEach(item => {
    total += Number(item.price);
    html += `
      <div class="drawer-service-item">
        <div style="flex: 1;">
          <div class="drawer-item-title">${item.title}</div>
          <div class="drawer-item-meta">${item.category} • ${item.duration}</div>
        </div>
        <div class="drawer-item-price">${formatDZD(item.price)}</div>
        <button type="button" class="btn-remove-drawer-item" onclick="removePackageItem(${item.id})" title="إزالة">&times;</button>
      </div>
    `;
  });

  drawerList.innerHTML = html;
  if (totalPriceEl) totalPriceEl.textContent = formatDZD(total);

  if (packageWaBtn) {
    packageWaBtn.style.opacity = '1';
    packageWaBtn.style.pointerEvents = 'auto';

    const cleanWa = (state.settings.whatsapp_number || '213781088061').replace(/\D/g, '');
    let msg = `مرحباً معهد JOVEN حيدرة، أود حجز الباقة المخصصة التالية المتكونة من (${count} خدمات):\n`;
    state.selectedPackage.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.title} (${item.duration}) - ${formatDZD(item.price)}\n`;
    });
    msg += `\nالمجموع الإجمالي: ${formatDZD(total)}\nيرجى تأكيد إمكانية حجز هذه الباقة وتزويدي بالمواعيد المتاحة.`;

    packageWaBtn.href = `https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`;
  }
}

// --------------------------------------------------------------------------
// PAGE 3: Instagram Hub & Reels Theater
// --------------------------------------------------------------------------
function renderIgHubHighlights() {
  const track = document.getElementById('igHubHighlightsTrack');
  if (!track) return;

  let html = '';
  state.highlights.forEach((hl, idx) => {
    html += `
      <div class="highlight-bubble-item" onclick="openStoryViewer(${idx})">
        <div class="highlight-ring">
          <img src="${hl.cover_url}" alt="${hl.title}" class="highlight-avatar">
        </div>
        <span class="highlight-name">${hl.title}</span>
        <span class="highlight-count">${hl.stories_count} ستوري</span>
      </div>
    `;
  });

  track.innerHTML = html;
}

function renderIgHubReels() {
  const grid = document.getElementById('igHubReelsGrid');
  if (!grid) return;

  const cleanWa = (state.settings.whatsapp_number || '213781088061').replace(/\D/g, '');

  let html = '';
  state.reels.forEach(r => {
    const waText = `مرحباً معهد JOVEN حيدرة، شاهدت فيديو ريلز: "${r.title}" وأود حجز موعد لنفس هذه الجلسة.`;
    const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waText)}`;

    html += `
      <div class="reel-card" data-reel-id="${r.id}">
        <div class="reel-video-wrapper">
          <video class="reel-video" src="${r.video_url}" poster="${r.poster_url || ''}" loop playsinline muted autoplay></video>
          <button type="button" class="reel-sound-toggle" onclick="toggleReelSound(${r.id}, this)" title="كتم/تشغيل الصوت">
            <span class="sound-icon">🔇</span>
          </button>
          <div class="reel-tag-overlay">${r.category}</div>
        </div>
        <div class="reel-info-glass">
          <h4 class="reel-title">${r.title}</h4>
          <div class="reel-actions">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-wa reel-book-btn">
              <span>💬</span> احجزي نفس الجلسة
            </a>
            ${r.instagram_permalink ? `<a href="${r.instagram_permalink}" target="_blank" rel="noopener noreferrer" class="reel-insta-btn" title="مشاهدة على إنستغرام">📸 Reel</a>` : ''}
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

function filterInstagramFeed(cat) {
  state.currentFeedFilter = cat;
  document.querySelectorAll('#igFilterPills .ig-pill').forEach(btn => {
    if (btn.textContent.includes(cat)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  renderInstagramFeed();
}

function renderInstagramFeed() {
  const grid = document.getElementById('igMasonryGrid');
  if (!grid) return;

  let posts = state.instagram_posts;
  if (state.currentFeedFilter !== 'الكل') {
    posts = posts.filter(p => p.category === state.currentFeedFilter);
  }

  let html = '';
  posts.forEach(p => {
    html += `
      <div class="ig-post-card" onclick="openPostDetail(${p.id})">
        <img src="${p.image_url}" alt="${p.title}" class="ig-post-img" loading="lazy">
        <div class="ig-post-overlay">
          <div class="ig-post-meta-top">
            <span>${p.category}</span>
            <span>❤️ ${p.likes_count}</span>
          </div>
          <p class="ig-post-caption-snippet">${p.caption}</p>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

function openPostDetail(postId) {
  const post = state.instagram_posts.find(p => p.id === postId);
  if (!post) return;

  const modal = document.getElementById('postDetailModal');
  const img = document.getElementById('postModalImg');
  const title = document.getElementById('postModalTitle');
  const cat = document.getElementById('postModalCategory');
  const likes = document.getElementById('postModalLikes');
  const date = document.getElementById('postModalDate');
  const caption = document.getElementById('postModalCaption');
  const waBtn = document.getElementById('postModalWaBtn');
  const igLink = document.getElementById('postModalIgLink');

  if (img) img.src = post.image_url;
  if (title) title.textContent = post.title;
  if (cat) cat.textContent = post.category;
  if (likes) likes.textContent = `❤️ ${post.likes_count} إعجاب`;
  if (date) date.textContent = post.date_posted;
  if (caption) caption.textContent = post.caption;

  const cleanWa = (state.settings.whatsapp_number || '213781088061').replace(/\D/g, '');
  const waMsg = `مرحباً معهد JOVEN حيدرة، شاهدت منشور "${post.title}" (${post.category}) على موقعكم وأود حجز نفس هذه الجلسة والاستفسار عن المواعيد المتاحة.`;
  if (waBtn) waBtn.href = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waMsg)}`;

  if (igLink && post.permalink) igLink.href = post.permalink;

  modal.classList.add('active');
}

function closePostDetailModal(e) {
  if (!e || e.target.id === 'postDetailModal' || e.target.classList.contains('modal-close')) {
    document.getElementById('postDetailModal')?.classList.remove('active');
  }
}

// --------------------------------------------------------------------------
// Full-Screen Story Viewer Logic
// --------------------------------------------------------------------------
function openStoryViewer(index) {
  if (!state.highlights || state.highlights.length === 0) return;
  state.activeHighlightIndex = index;

  const modal = document.getElementById('storyViewerModal');
  modal.classList.add('active');
  loadActiveStorySlide();
}

function loadActiveStorySlide() {
  const hl = state.highlights[state.activeHighlightIndex];
  if (!hl) return;

  const img = document.getElementById('storyViewerImg');
  const title = document.getElementById('storyViewerTitle');
  const category = document.getElementById('storyViewerCategory');
  const desc = document.getElementById('storyViewerDesc');
  const waBtn = document.getElementById('storyWaBookingBtn');
  const fill = document.getElementById('storyProgressFill');

  if (img) img.src = hl.cover_url;
  if (title) title.textContent = hl.title;
  if (category) category.textContent = hl.category;

  const storiesDescriptions = {
    'Hydrafacial': 'بروتوكول Hydrafacial Prestige الطبي بـ 6 مراحل سريرية: تنظيف المسام، شفط الشوائب بجهاز Vortex، وضخ مضادات الأكسدة مع جلسة LED.',
    'Head Spa': 'طقس Japanese Head Spa الاسترخائي: بخار الأوزون، شلال الماء الدائري الدافئ، وتدليك فروة الرأس والرقبة في فضاء نسائي مغلق.',
    'Onglerie BIAB': 'المانيكير الروسي فائق الدقة مع تعزيز الجل بياب (BIAB) لحماية الأظافر الطبيعية وثبات يدوم لأكثر من 3 أسابيع.',
    'Soins Visage': 'باقات العناية بالوجه، التقشير بأحماض الفواكه، الميكرونيدلينغ، وجلسات النضارة الفورية قبل المناسبات.',
    'Tarifs & Packs': 'باقات العناية المتكاملة مع خصومات حصرية، بما في ذلك باقة العروس الملكية وباقات الـ Head Spa.',
    'Avis Clientes': 'أكثر من 264 تقييم حقيقي بدرجة 4.8 / 5 على Google Maps تشيد بنظافة المعهد واحترافية الخبيرات والخصوصية التامة.'
  };

  if (desc) desc.textContent = storiesDescriptions[hl.title] || 'اكتشفي أدق التفاصيل وكواليس الجلسات المنفذة داخل أجنحة معهدنا بحيدرة.';

  const cleanWa = (state.settings.whatsapp_number || '213781088061').replace(/\D/g, '');
  const waMsg = `مرحباً معهد JOVEN، شاهدت ستوري (${hl.title}) على موقعكم وأود حجز موعد والاستفسار عن هذه الجلسة.`;
  if (waBtn) waBtn.href = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waMsg)}`;

  // Animate progress bar
  if (state.storyTimer) clearInterval(state.storyTimer);
  let progress = 0;
  if (fill) fill.style.width = '0%';

  state.storyTimer = setInterval(() => {
    progress += 2;
    if (fill) fill.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(state.storyTimer);
      navigateStory(1);
    }
  }, 100);
}

function navigateStory(direction) {
  if (state.storyTimer) clearInterval(state.storyTimer);
  const nextIdx = state.activeHighlightIndex + direction;

  if (nextIdx >= 0 && nextIdx < state.highlights.length) {
    state.activeHighlightIndex = nextIdx;
    loadActiveStorySlide();
  } else {
    closeStoryViewer();
  }
}

function closeStoryViewer(e) {
  if (state.storyTimer) clearInterval(state.storyTimer);
  document.getElementById('storyViewerModal')?.classList.remove('active');
}

// --------------------------------------------------------------------------
// PAGE 6: Smart Concierge Wizard
// --------------------------------------------------------------------------
function populateWizardServices() {
  const select = document.getElementById('wizardServiceSelect');
  if (!select) return;

  const currentVal = select.value;
  let html = '<option value="">-- اختاري من القائمة المعتمدة --</option>';

  state.services.forEach(s => {
    html += `<option value="${s.id}" data-price="${s.price}" data-duration="${s.duration}">${s.title} (${formatDZD(s.price)} • ${s.duration})</option>`;
  });

  select.innerHTML = html;
  if (currentVal) select.value = currentVal;
  updateWizardPricePreview();
}

function updateWizardPricePreview() {
  const select = document.getElementById('wizardServiceSelect');
  const preview = document.getElementById('wizardPricePreview');
  if (!select || !preview) return;

  const selectedOpt = select.options[select.selectedIndex];
  if (selectedOpt && selectedOpt.value) {
    const price = selectedOpt.getAttribute('data-price');
    const dur = selectedOpt.getAttribute('data-duration');
    preview.textContent = `السعر المعتمد في السيرفر: ${formatDZD(price)} • مدة الجلسة: ${dur}`;
  } else {
    preview.textContent = 'السعر المعتمد: -- دج';
  }
}

function handleWizardDateChange() {
  const dateInput = document.getElementById('wizardDateInput');
  const hint = document.getElementById('wizardDayHint');
  if (!dateInput || !hint) return;

  const dateVal = new Date(dateInput.value);
  const day = dateVal.getDay();

  if (day === 5) {
    hint.innerHTML = '<strong style="color: var(--ruby-promo);">تنبيه: يوم الجمعة عطلة أسبوعية للمعهد! يرجى اختيار يوم آخر.</strong>';
  } else if (day === 3) {
    hint.innerHTML = '<span style="color: var(--gold-deep);">ملاحظة: يوم الأربعاء الدوام من 09:00 إلى 12:00 فقط.</span>';
  } else if (day === 0) {
    hint.innerHTML = '<span style="color: #1F9D55;">يوم الأحد دوام مطول حتى 19:00 مساءً.</span>';
  } else {
    hint.innerHTML = 'مفتوح من 09:00 إلى 17:00 (حيدرة)';
  }
}

function generateWizardBooking(e) {
  e.preventDefault();
  const select = document.getElementById('wizardServiceSelect');
  const dateInput = document.getElementById('wizardDateInput');
  const timeSelect = document.getElementById('wizardTimeSelect');
  const nameInput = document.getElementById('wizardClientName');
  const notesInput = document.getElementById('wizardClientNotes');

  const selectedOpt = select.options[select.selectedIndex];
  if (!selectedOpt || !selectedOpt.value) {
    showToast('يرجى اختيار الخدمة المطلوبة', 'error');
    return;
  }

  const treatmentName = selectedOpt.text;
  const preferredDate = dateInput.value;
  const preferredTime = timeSelect.value;
  const clientName = nameInput.value.trim() || 'زبونة موقرة';
  const notes = notesInput.value.trim() || 'لا توجد ملاحظات إضافية';

  const cleanWa = (state.settings.whatsapp_number || '213781088061').replace(/\D/g, '');

  const msg = `*✨ تذكرة حجز موعد VIP • معهد JOVEN حيدرة*\n\n` +
    `👤 *الاسم:* ${clientName}\n` +
    `💆‍♀️ *الخدمة المطلوبة:* ${treatmentName}\n` +
    `📅 *اليوم المفضل:* ${preferredDate}\n` +
    `⏰ *التوقيت:* ${preferredTime}\n` +
    `📝 *ملاحظات خاصة:* ${notes}\n\n` +
    `📍 *المقر:* 27, Chemin de la Madeleine, Hydra, Alger\n` +
    `يرجى تأكيد إمكانية تثبيت هذا الموعد وتزويدي بالتفاصيل. شكراً لكم!`;

  const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
  showToast('تم تجهيز تذكرة الحجز وفتح الواتساب بنجاح ✅');
}

// --------------------------------------------------------------------------
// FAQs Accordion
// --------------------------------------------------------------------------
function renderFaqsAccordion() {
  const container = document.getElementById('faqAccordion');
  if (!container) return;

  let html = '';
  state.faqs.forEach((faq, index) => {
    const isFirst = index === 0 ? 'active' : '';
    html += `
      <div class="faq-item ${isFirst}" onclick="toggleFaq(this)">
        <div class="faq-header">
          <span>${faq.question}</span>
          <span class="faq-icon">＋</span>
        </div>
        <div class="faq-body">
          <p>${faq.answer}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function toggleFaq(itemElement) {
  const wasActive = itemElement.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!wasActive) {
    itemElement.classList.add('active');
  }
}

// --------------------------------------------------------------------------
// Upgraded Admin CMS Dashboard (Prices, Reels & Posts Sync)
// --------------------------------------------------------------------------
function renderAdminView() {
  // Update stats
  const totalServices = state.services.length;
  const promoServices = state.services.filter(s => s.is_promo === 1).length;
  const totalMedia = state.reels.length + state.instagram_posts.length;

  document.getElementById('statTotalServices').textContent = totalServices;
  document.getElementById('statPromoServices').textContent = promoServices;
  document.getElementById('statTotalMedia').textContent = totalMedia;

  // Populate settings
  document.getElementById('inputWaNumber').value = state.settings.whatsapp_number || '';
  document.getElementById('inputAddress').value = state.settings.address || '';
  document.getElementById('inputRating').value = state.settings.rating || '';
  document.getElementById('inputReviewsCount').value = state.settings.reviews_count || '';

  const inIgHandle = document.getElementById('inputInstagramHandle');
  if (inIgHandle) inIgHandle.value = state.settings.instagram_handle || '';

  const inIgUrl = document.getElementById('inputInstagramUrl');
  if (inIgUrl) inIgUrl.value = state.settings.instagram_url || '';

  const inLogo = document.getElementById('inputLogoUrl');
  if (inLogo) inLogo.value = state.settings.logo_url || '';

  const inHero = document.getElementById('inputHeroImageUrl');
  if (inHero) inHero.value = state.settings.hero_image_url || '';

  renderAdminServicesTable();
  renderAdminReelsTable();
  renderAdminPostsTable();
  renderAdminGallery();
}

function filterAdminServices() {
  state.adminSearchTerm = document.getElementById('adminSearchInput').value.toLowerCase().trim();
  renderAdminServicesTable();
}

function renderAdminServicesTable() {
  const tbody = document.getElementById('adminServicesTableBody');
  if (!tbody) return;

  let list = state.services;
  if (state.adminSearchTerm) {
    list = list.filter(s =>
      s.title.toLowerCase().includes(state.adminSearchTerm) ||
      s.category.toLowerCase().includes(state.adminSearchTerm)
    );
  }

  let html = '';
  for (const s of list) {
    const isPromo = s.is_promo === 1;

    html += `
      <tr id="service-row-${s.id}">
        <td>
          <div style="font-weight: 700; color: #1E1B18;">${s.title}</div>
          <span class="service-category-tag" style="font-size: 0.75rem;">${s.category}</span>
        </td>
        <td>${s.duration}</td>
        <td>
          <button type="button" class="promo-toggle-btn ${isPromo ? 'active' : ''}" onclick="toggleServicePromo(${s.id})">
            <span>${isPromo ? '🔥 عرض مفعل' : 'عادي'}</span>
          </button>
        </td>
        <td>
          <div class="price-stepper-box">
            <button type="button" class="stepper-btn minus" onclick="stepServicePrice(${s.id}, -500)" title="تخفيض 500 دج">- 500 دج</button>
            <input type="number" class="stepper-input" value="${s.price}" step="100" min="500" onchange="updateServicePriceInput(${s.id}, this.value)">
            <button type="button" class="stepper-btn" onclick="stepServicePrice(${s.id}, 500)" title="زيادة 500 دج">+ 500 دج</button>
          </div>
        </td>
        <td>
          <input type="number" class="old-price-input" value="${s.old_price || ''}" placeholder="لا يوجد" onchange="updateServiceOldPrice(${s.id}, this.value)">
        </td>
        <td>
          <div class="table-actions">
            <button type="button" class="btn-icon-action" onclick="openEditServiceModal(${s.id})" title="تعديل التفاصيل">✏️ تعديل</button>
            <button type="button" class="btn-icon-action delete" onclick="deleteService(${s.id})" title="حذف الخدمة">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  }

  tbody.innerHTML = html;
}

async function stepServicePrice(id, delta) {
  const service = state.services.find(s => s.id === id);
  if (!service) return;

  const currentPrice = Number(service.price) || 0;
  const newPrice = Math.max(500, currentPrice + delta);

  try {
    const res = await fetch(`/api/services/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: newPrice })
    });
    const json = await res.json();
    if (json.success && json.service) {
      service.price = json.service.price;
      renderAdminServicesTable();
      renderBentoPrices();
      populateWizardServices();
      showToast(`تم حفظ السعر الجديد في قاعدة البيانات ✅ (${formatDZD(newPrice)})`);
    } else {
      showToast('فشل تحديث السعر', 'error');
    }
  } catch (err) {
    console.error('Error stepping price:', err);
    showToast('خطأ في الاتصال بقاعدة البيانات', 'error');
  }
}

async function updateServicePriceInput(id, val) {
  const newPrice = parseInt(val, 10);
  if (isNaN(newPrice) || newPrice < 500) {
    showToast('يرجى إدخال سعر صحيح (500 دج أو أكثر)', 'error');
    renderAdminServicesTable();
    return;
  }

  try {
    const res = await fetch(`/api/services/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: newPrice })
    });
    const json = await res.json();
    if (json.success && json.service) {
      const s = state.services.find(x => x.id === id);
      if (s) s.price = json.service.price;
      renderAdminServicesTable();
      renderBentoPrices();
      populateWizardServices();
      showToast(`تم حفظ السعر الجديد في قاعدة البيانات ✅ (${formatDZD(newPrice)})`);
    }
  } catch (err) {
    console.error('Error updating price input:', err);
    showToast('خطأ في حفظ السعر', 'error');
  }
}

async function toggleServicePromo(id) {
  const service = state.services.find(s => s.id === id);
  if (!service) return;

  const nextPromo = service.is_promo === 1 ? 0 : 1;
  const updatePayload = { is_promo: nextPromo };

  if (nextPromo === 1 && (!service.old_price || service.old_price <= service.price)) {
    updatePayload.old_price = service.price + 1500;
  }

  try {
    const res = await fetch(`/api/services/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    });
    const json = await res.json();
    if (json.success && json.service) {
      service.is_promo = json.service.is_promo;
      service.old_price = json.service.old_price;
      renderAdminView();
      renderBentoPrices();
      showToast(nextPromo === 1 ? 'تم تفعيل العرض الخاص بنجاح 🔥' : 'تم تعطيل العرض الخاص');
    }
  } catch (err) {
    console.error('Error toggling promo:', err);
  }
}

async function updateServiceOldPrice(id, val) {
  const oldPrice = val ? parseInt(val, 10) : null;
  try {
    const res = await fetch(`/api/services/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ old_price: oldPrice })
    });
    const json = await res.json();
    if (json.success && json.service) {
      const s = state.services.find(x => x.id === id);
      if (s) s.old_price = json.service.old_price;
      showToast('تم تحديث السعر المشطوب في قاعدة البيانات ✅');
    }
  } catch (err) {
    console.error('Error updating old price:', err);
  }
}

async function deleteService(id) {
  const service = state.services.find(s => s.id === id);
  if (!service) return;

  if (!confirm(`هل أنتِ متأكدة من حذف الخدمة: "${service.title}" نهائياً من قاعدة البيانات؟`)) return;

  try {
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      state.services = state.services.filter(s => s.id !== id);
      state.selectedPackage = state.selectedPackage.filter(s => s.id !== id);
      renderAdminView();
      renderServicesGrid();
      populateWizardServices();
      showToast('تم حذف الخدمة من قاعدة البيانات بنجاح ✅');
    }
  } catch (err) {
    console.error('Error deleting service:', err);
  }
}

// --------------------------------------------------------------------------
// Admin Reels CMS Table & Handlers
// --------------------------------------------------------------------------
function renderAdminReelsTable() {
  const tbody = document.getElementById('adminReelsTableBody');
  if (!tbody) return;

  let html = '';
  state.reels.forEach(r => {
    html += `
      <tr>
        <td>
          <video src="${r.video_url}" poster="${r.poster_url || ''}" class="admin-reel-preview-video" muted playsinline></video>
        </td>
        <td>
          <div style="font-weight: 700; color: #1E1B18;">${r.title}</div>
          <span class="service-category-tag" style="font-size: 0.75rem;">${r.category}</span>
        </td>
        <td><code style="font-size: 0.78rem; color: var(--gold-deep);">${r.video_url}</code></td>
        <td>
          ${r.instagram_permalink ? `<a href="${r.instagram_permalink}" target="_blank" rel="noopener noreferrer" style="color: var(--gold-primary); font-size: 0.85rem; font-weight: 600;">🔗 عرض على IG</a>` : '<span style="color:#999; font-size: 0.8rem;">-</span>'}
        </td>
        <td>
          <div class="table-actions">
            <button type="button" class="btn-icon-action delete" onclick="deleteReel(${r.id})" title="حذف هذا الريلز">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function openAddReelModal() {
  document.getElementById('reelTitle').value = '';
  document.getElementById('reelCategory').value = 'العناية بالبشرة';
  document.getElementById('reelVideoFile').value = '';
  document.getElementById('reelVideoUrl').value = '';
  document.getElementById('reelPosterUrl').value = '';
  document.getElementById('reelInstagramPermalink').value = '';
  document.getElementById('btnSubmitReel').textContent = 'حفظ الريلز في قاعدة البيانات';
  document.getElementById('reelModal').classList.add('active');
}

function closeReelModal() {
  document.getElementById('reelModal')?.classList.remove('active');
}

async function saveReelForm(e) {
  e.preventDefault();
  const btn = document.getElementById('btnSubmitReel');
  btn.disabled = true;
  btn.textContent = 'جارٍ الرفع والمعالجة...';

  try {
    const title = document.getElementById('reelTitle').value.trim();
    const category = document.getElementById('reelCategory').value;
    let video_url = document.getElementById('reelVideoUrl').value.trim();
    const poster_url = document.getElementById('reelPosterUrl').value.trim();
    const instagram_permalink = document.getElementById('reelInstagramPermalink').value.trim();

    const fileInput = document.getElementById('reelVideoFile');
    if (fileInput.files && fileInput.files.length > 0) {
      showToast('جارٍ رفع ملف الفيديو إلى الخادم المحلي...');
      const formData = new FormData();
      formData.append('mediaFile', fileInput.files[0]);

      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      const uploadJson = await uploadRes.json();
      if (!uploadJson.success) throw new Error(uploadJson.error || 'فشل رفع ملف الفيديو');
      video_url = uploadJson.url;
    }

    if (!video_url) {
      showToast('يرجى اختيار ملف فيديو أو إدخال مسار الفيديو', 'error');
      btn.disabled = false;
      btn.textContent = 'حفظ الريلز في قاعدة البيانات';
      return;
    }

    const payload = { title, category, video_url, poster_url, instagram_permalink };
    const res = await fetch('/api/reels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();

    if (json.success && json.reel) {
      state.reels.push(json.reel);
      closeReelModal();
      renderAdminReelsTable();
      renderHomeReels();
      renderIgHubReels();
      showToast('تمت إضافة وحفظ الريلز في قاعدة البيانات بنجاح ✅');
    }
  } catch (err) {
    console.error('Error saving reel:', err);
    showToast(err.message || 'خطأ أثناء حفظ الريلز', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'حفظ الريلز في قاعدة البيانات';
  }
}

async function deleteReel(id) {
  const reel = state.reels.find(r => r.id === id);
  if (!confirm(`حذف الريلز: "${reel ? reel.title : ''}"؟`)) return;

  try {
    const res = await fetch(`/api/reels/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      state.reels = state.reels.filter(r => r.id !== id);
      renderAdminReelsTable();
      renderHomeReels();
      renderIgHubReels();
      showToast('تم حذف مقطع الريلز من قاعدة البيانات بنجاح ✅');
    }
  } catch (err) {
    console.error('Error deleting reel:', err);
  }
}

// --------------------------------------------------------------------------
// Admin Instagram Posts Table & Handlers
// --------------------------------------------------------------------------
function renderAdminPostsTable() {
  const tbody = document.getElementById('adminPostsTableBody');
  if (!tbody) return;

  let html = '';
  state.instagram_posts.forEach(p => {
    html += `
      <tr>
        <td>
          <img src="${p.image_url}" alt="${p.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
        </td>
        <td>
          <div style="font-weight: 700; color: #1E1B18;">${p.title}</div>
          <p style="font-size: 0.8rem; color: #666; margin: 0; line-height: 1.3;">${p.caption.slice(0, 60)}...</p>
        </td>
        <td><span class="service-category-tag" style="font-size: 0.75rem;">${p.category}</span></td>
        <td>
          <span style="font-size: 0.85rem;">❤️ ${p.likes_count} • ${p.date_posted}</span>
        </td>
        <td>
          <div class="table-actions">
            <button type="button" class="btn-icon-action delete" onclick="deleteInstagramPost(${p.id})" title="حذف هذا المنشور">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function openAddPostModal() {
  document.getElementById('postFormTitle').value = '';
  document.getElementById('postFormCategory').value = 'نتائج البشرة';
  document.getElementById('postFormFile').value = '';
  document.getElementById('postFormImageUrl').value = '';
  document.getElementById('postFormCaption').value = '';
  document.getElementById('postFormLikes').value = '280';
  document.getElementById('postFormDate').value = 'الآن';
  document.getElementById('postModal').classList.add('active');
}

function closeAddPostModal() {
  document.getElementById('postModal')?.classList.remove('active');
}

async function savePostForm(e) {
  e.preventDefault();
  const btn = document.getElementById('btnSubmitPost');
  btn.disabled = true;
  btn.textContent = 'جارٍ الرفع والحفظ...';

  try {
    const title = document.getElementById('postFormTitle').value.trim();
    const category = document.getElementById('postFormCategory').value;
    let image_url = document.getElementById('postFormImageUrl').value.trim();
    const caption = document.getElementById('postFormCaption').value.trim();
    const likes_count = parseInt(document.getElementById('postFormLikes').value, 10) || 280;
    const date_posted = document.getElementById('postFormDate').value.trim() || 'الآن';

    const fileInput = document.getElementById('postFormFile');
    if (fileInput.files && fileInput.files.length > 0) {
      showToast('جارٍ رفع صورة المنشور إلى السيرفر...');
      const formData = new FormData();
      formData.append('mediaFile', fileInput.files[0]);

      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      const uploadJson = await uploadRes.json();
      if (!uploadJson.success) throw new Error(uploadJson.error || 'فشل رفع الصورة');
      image_url = uploadJson.url;
    }

    if (!image_url) {
      showToast('يرجى اختيار صورة للمنشور', 'error');
      btn.disabled = false;
      btn.textContent = 'حفظ المنشور في قاعدة البيانات';
      return;
    }

    const payload = { title, category, image_url, caption, likes_count, date_posted };
    const res = await fetch('/api/instagram_posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();

    if (json.success && json.post) {
      state.instagram_posts.unshift(json.post);
      closeAddPostModal();
      renderAdminPostsTable();
      renderHomeFeedPreview();
      renderInstagramFeed();
      showToast('تمت إضافة منشور إنستغرام الجديد بنجاح ✅');
    }
  } catch (err) {
    console.error('Error saving post:', err);
    showToast(err.message || 'خطأ أثناء الحفظ', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'حفظ المنشور في قاعدة البيانات';
  }
}

async function deleteInstagramPost(id) {
  if (!confirm('هل أنتِ متأكدة من حذف هذا المنشور؟')) return;

  try {
    const res = await fetch(`/api/instagram_posts/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      state.instagram_posts = state.instagram_posts.filter(p => p.id !== id);
      renderAdminPostsTable();
      renderHomeFeedPreview();
      renderInstagramFeed();
      showToast('تم حذف المنشور بنجاح ✅');
    }
  } catch (err) {
    console.error('Error deleting post:', err);
  }
}

// --------------------------------------------------------------------------
// Admin Services Modal & Gallery Handlers
// --------------------------------------------------------------------------
function openAddServiceModal() {
  document.getElementById('serviceModalTitle').textContent = 'إضافة خدمة أو عرض جديد';
  document.getElementById('serviceId').value = '';
  document.getElementById('formTitle').value = '';
  document.getElementById('formCategory').value = 'العناية بالبشرة';
  document.getElementById('formDescription').value = '';
  document.getElementById('formDuration').value = '60 دقيقة';
  document.getElementById('formPrice').value = '';
  document.getElementById('formOldPrice').value = '';
  document.getElementById('formIsPromo').checked = false;
  document.getElementById('btnSubmitService').textContent = 'إضافة الخدمة في قاعدة البيانات';
  document.getElementById('serviceModal').classList.add('active');
}

function openEditServiceModal(id) {
  const s = state.services.find(x => x.id === id);
  if (!s) return;

  document.getElementById('serviceModalTitle').textContent = 'تعديل بيانات الخدمة';
  document.getElementById('serviceId').value = s.id;
  document.getElementById('formTitle').value = s.title;
  document.getElementById('formCategory').value = s.category;
  document.getElementById('formDescription').value = s.description;
  document.getElementById('formDuration').value = s.duration;
  document.getElementById('formPrice').value = s.price;
  document.getElementById('formOldPrice').value = s.old_price || '';
  document.getElementById('formIsPromo').checked = s.is_promo === 1;
  document.getElementById('btnSubmitService').textContent = 'حفظ التعديلات في قاعدة البيانات';
  document.getElementById('serviceModal').classList.add('active');
}

function closeServiceModal() {
  document.getElementById('serviceModal')?.classList.remove('active');
}

async function saveServiceForm(e) {
  e.preventDefault();
  const id = document.getElementById('serviceId').value;
  const title = document.getElementById('formTitle').value.trim();
  const category = document.getElementById('formCategory').value;
  const description = document.getElementById('formDescription').value.trim();
  const duration = document.getElementById('formDuration').value.trim();
  const price = parseInt(document.getElementById('formPrice').value, 10);
  const oldPriceVal = document.getElementById('formOldPrice').value;
  const old_price = oldPriceVal ? parseInt(oldPriceVal, 10) : null;
  const is_promo = document.getElementById('formIsPromo').checked ? 1 : 0;

  const payload = { title, category, description, duration, price, old_price, is_promo };

  try {
    if (id) {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success && json.service) {
        const idx = state.services.findIndex(s => s.id === Number(id));
        if (idx !== -1) state.services[idx] = json.service;
        closeServiceModal();
        renderAdminView();
        renderServicesGrid();
        populateWizardServices();
        showToast('تم تحديث بيانات الخدمة في قاعدة البيانات بنجاح ✅');
      }
    } else {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success && json.service) {
        state.services.push(json.service);
        closeServiceModal();
        renderAdminView();
        renderServicesGrid();
        populateWizardServices();
        showToast('تمت إضافة الخدمة الجديدة إلى قاعدة البيانات بنجاح ✅');
      }
    }
  } catch (err) {
    console.error('Error saving service form:', err);
  }
}

function openAddGalleryModal() {
  document.getElementById('galleryTitle').value = '';
  document.getElementById('gallerySubtitle').value = '';
  document.getElementById('galleryImageUrl').value = '/media/posts/post-1.webp';
  document.getElementById('galleryModal').classList.add('active');
}

function closeGalleryModal() {
  document.getElementById('galleryModal')?.classList.remove('active');
}

async function saveGalleryForm(e) {
  e.preventDefault();
  const title = document.getElementById('galleryTitle').value.trim();
  const subtitle = document.getElementById('gallerySubtitle').value.trim();
  const category = document.getElementById('galleryCategory').value;
  const image_url = document.getElementById('galleryImageUrl').value.trim();

  try {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, subtitle, category, image_url })
    });
    const json = await res.json();
    if (json.success && json.item) {
      state.gallery.push(json.item);
      closeGalleryModal();
      renderAdminGallery();
      showToast('تمت إضافة الصورة إلى المعرض ✅');
    }
  } catch (err) {
    console.error('Error adding gallery image:', err);
  }
}

function renderAdminGallery() {
  const container = document.getElementById('adminGalleryList');
  if (!container) return;

  let html = '';
  state.gallery.forEach(item => {
    html += `
      <div class="admin-gallery-item">
        <button type="button" class="btn-del-img" onclick="deleteGalleryItem(${item.id})" title="حذف">&times;</button>
        <img src="${item.image_url}" alt="${item.title}">
        <div class="admin-gallery-caption">
          <strong>${item.title}</strong>
          <span>${item.category}</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

async function deleteGalleryItem(id) {
  if (!confirm('حذف هذه الصورة من المعرض؟')) return;
  try {
    const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      state.gallery = state.gallery.filter(g => g.id !== id);
      renderAdminGallery();
      showToast('تم حذف الصورة من المعرض');
    }
  } catch (err) {
    console.error('Error deleting gallery item:', err);
  }
}

async function saveSettings(e) {
  e.preventDefault();
  const whatsapp_number = document.getElementById('inputWaNumber').value.trim();
  const address = document.getElementById('inputAddress').value.trim();
  const rating = document.getElementById('inputRating').value.trim();
  const reviews_count = document.getElementById('inputReviewsCount').value.trim();
  const instagram_handle = document.getElementById('inputInstagramHandle')?.value.trim() || '@joven_institut';
  const instagram_url = document.getElementById('inputInstagramUrl')?.value.trim() || 'https://www.instagram.com/joven_institut/';
  const logo_url = document.getElementById('inputLogoUrl')?.value.trim() || '/media/brand/joven-logo.webp';
  const hero_image_url = document.getElementById('inputHeroImageUrl')?.value.trim() || '/media/brand/joven-hero.webp';

  try {
    const res = await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        whatsapp_number,
        address,
        rating,
        reviews_count,
        instagram_handle,
        instagram_url,
        logo_url,
        hero_image_url
      })
    });
    const json = await res.json();
    if (json.success && json.settings) {
      state.settings = { ...state.settings, ...json.settings };
      renderAll();
      showToast('تم حفظ الإعدادات ورقم الواتساب وبيانات إنستغرام بنجاح في قاعدة البيانات ✅');
    }
  } catch (err) {
    console.error('Error saving settings:', err);
  }
}

// --------------------------------------------------------------------------
// Initialization
// --------------------------------------------------------------------------
function renderAll() {
  renderClientGlobal();
  if (state.currentView === 'client') {
    navigateTo(state.currentPage || 'home', false);
  } else {
    renderAdminView();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('hashchange', handleHashChange);

  // Check initial hash route
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (hash && pageMap[hash]) {
    state.currentPage = hash;
  }

  fetchBootstrapData();
  setInterval(updateLiveOpenStatus, 60000);
});
