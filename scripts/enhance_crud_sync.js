const fs = require('fs');
const path = require('path');

// 1. UPDATE public/admin.html
const adminPath = path.join(__dirname, '..', 'public', 'admin.html');
let adminHtml = fs.readFileSync(adminPath, 'utf8');

// Replace the loadServices card markup to add id="service-card-${s.id}"
adminHtml = adminHtml.replace(
  'container.innerHTML = servicesData.map(s => `\n        <div class="data-card">',
  'container.innerHTML = servicesData.map(s => `\n        <div class="data-card" id="service-card-${s.id}">',
);

// Replace loadOffers card markup to add id="offer-card-${o.id}"
adminHtml = adminHtml.replace(
  'container.innerHTML = offersData.map(o => `\n        <div class="data-card">',
  'container.innerHTML = offersData.map(o => `\n        <div class="data-card" id="offer-card-${o.id}">',
);

// Replace loadGallery card markup to add id="gallery-card-${g.id}"
adminHtml = adminHtml.replace(
  'container.innerHTML = galleryData.map(g => `\n        <div class="gallery-card">',
  'container.innerHTML = galleryData.map(g => `\n        <div class="gallery-card" id="gallery-card-${g.id}">',
);

// Enhance deleteService function
const enhancedDeleteService = `
    async function deleteService(id, title) {
      if (!confirm(\`Voulez-vous vraiment supprimer définitivement "\${title}" ?\\nهل أنتِ متأكدة من حذف هذه الخدمة نهائياً من الموقع وقاعدة البيانات؟\`)) return;

      const card = document.getElementById('service-card-' + id);
      if (card) {
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        card.style.opacity = '0.3';
        card.style.transform = 'scale(0.95)';
        card.style.pointerEvents = 'none';
      }

      showToast('Suppression en cours... / جاري الحذف...', '⏳');

      try {
        const { error, count } = await supabaseClient.from('services').delete().eq('id', id);
        if (error) {
          if (card) { card.style.opacity = '1'; card.style.transform = 'none'; card.style.pointerEvents = 'auto'; }
          throw error;
        }
        if (card) card.remove();
        showToast('Soin supprimé définitivement ! / تم حذف الخدمة بنجاح', '🗑️');
        await loadServices();
      } catch (err) {
        alert('Erreur lors de la suppression: ' + err.message);
      }
    }
`;

adminHtml = adminHtml.replace(/async function deleteService[\s\S]*?loadServices\(\);\s*\}\s*catch[\s\S]*?\}\s*\}/, enhancedDeleteService.trim());

// Enhance deleteOffer function
const enhancedDeleteOffer = `
    async function deleteOffer(id, title) {
      if (!confirm(\`Supprimer l'offre "\${title}" ?\\nهل أنتِ متأكدة من حذف هذا العرض الترويجي نهائياً من الموقع؟\`)) return;

      const card = document.getElementById('offer-card-' + id);
      if (card) {
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        card.style.opacity = '0.3';
        card.style.transform = 'scale(0.95)';
        card.style.pointerEvents = 'none';
      }

      showToast('Suppression de l\\'offre... / جاري حذف العرض...', '⏳');

      try {
        const { error } = await supabaseClient.from('offers').delete().eq('id', id);
        if (error) {
          if (card) { card.style.opacity = '1'; card.style.transform = 'none'; card.style.pointerEvents = 'auto'; }
          throw error;
        }
        if (card) card.remove();
        showToast('Offre supprimée définitivement ! / تم حذف العرض بنجاح', '🗑️');
        await loadOffers();
      } catch (err) {
        alert('Erreur: ' + err.message);
      }
    }
`;

adminHtml = adminHtml.replace(/async function deleteOffer[\s\S]*?loadOffers\(\);\s*\}\s*catch[\s\S]*?\}\s*\}/, enhancedDeleteOffer.trim());

// Enhance deleteGalleryItem function
const enhancedDeleteGalleryItem = `
    async function deleteGalleryItem(id) {
      if (!confirm('Supprimer cette photo de la galerie ?\\nهل تريدين حذف هذه الصورة نهائياً من الموقع؟')) return;

      const card = document.getElementById('gallery-card-' + id);
      if (card) {
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        card.style.opacity = '0.3';
        card.style.transform = 'scale(0.95)';
        card.style.pointerEvents = 'none';
      }

      showToast('Suppression de la photo... / جاري حذف الصورة...', '⏳');

      try {
        const { error } = await supabaseClient.from('gallery_images').delete().eq('id', id);
        if (error) {
          if (card) { card.style.opacity = '1'; card.style.transform = 'none'; card.style.pointerEvents = 'auto'; }
          throw error;
        }
        if (card) card.remove();
        showToast('Photo supprimée avec succès ! / تم حذف الصورة نهائياً', '🗑️');
        await loadGallery();
      } catch (err) {
        alert('Erreur: ' + err.message);
      }
    }
`;

adminHtml = adminHtml.replace(/async function deleteGalleryItem[\s\S]*?loadGallery\(\);\s*\}\s*catch[\s\S]*?\}\s*\}/, enhancedDeleteGalleryItem.trim());

// Enhance saveOffer function with button loading feedback and fallbacks
const enhancedSaveOffer = `
    async function saveOffer(e) {
      e.preventDefault();
      const submitBtn = e.target.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerText : 'Enregistrer';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = 'Enregistrement en cours...'; }

      const id = document.getElementById('offerId').value;
      const title = document.getElementById('offerTitle').value.trim();
      const title_ar = document.getElementById('offerTitleAr').value.trim();
      const badge = document.getElementById('offerBadge').value.trim();
      const badge_ar = document.getElementById('offerBadgeAr').value.trim();
      const old_price = document.getElementById('offerOldPrice').value.trim();
      const new_price = document.getElementById('offerNewPrice').value.trim();
      const image_url = document.getElementById('offerImageUrl').value.trim() || 'media/hydra_after.jpg';
      const description = document.getElementById('offerDesc').value.trim();
      const description_ar = document.getElementById('offerDescAr').value.trim();

      const payload = {
        title,
        title_ar: title_ar || title,
        badge: badge || '-20% Promo',
        badge_ar: badge_ar || (badge ? badge : 'عرض خاص'),
        old_price: old_price || null,
        new_price,
        image_url,
        description,
        description_ar: description_ar || description,
        is_active: true
      };

      try {
        if (id) {
          const { error } = await supabaseClient.from('offers').update(payload).eq('id', id);
          if (error) throw error;
          showToast('Offre mise à jour avec succès ! / تم تعديل العرض بنجاح');
        } else {
          const { error } = await supabaseClient.from('offers').insert([payload]);
          if (error) throw error;
          showToast('Nouvelle offre publiée avec succès ! / تم نشر العرض بنجاح');
        }
        closeOfferModal();
        await loadOffers();
      } catch (err) {
        alert('Erreur: ' + err.message);
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerText = origText; }
      }
    }
`;

adminHtml = adminHtml.replace(/async function saveOffer[\s\S]*?loadOffers\(\);\s*\}\s*catch[\s\S]*?\}\s*\}/, enhancedSaveOffer.trim());

// Enhance saveGallery function with button loading feedback
const enhancedSaveGallery = `
    async function saveGallery(e) {
      e.preventDefault();
      const submitBtn = e.target.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerText : 'Publier';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = 'Publication en cours...'; }

      const title = document.getElementById('galTitle').value.trim();
      const category = document.getElementById('galCategory').value;
      const image_url = document.getElementById('galImageUrl').value.trim();

      try {
        const { error } = await supabaseClient.from('gallery_images').insert([{
          title,
          category,
          image_url
        }]);
        if (error) throw error;
        showToast('Photo ajoutée à la galerie ! / تمت إضافة الصورة بنجاح');
        closeGalleryModal();
        await loadGallery();
      } catch (err) {
        alert('Erreur: ' + err.message);
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerText = origText; }
      }
    }
`;

adminHtml = adminHtml.replace(/async function saveGallery[\s\S]*?loadGallery\(\);\s*\}\s*catch[\s\S]*?\}\s*\}/, enhancedSaveGallery.trim());

// Enhance saveService function with button loading feedback
const enhancedSaveService = `
    async function saveService(e) {
      e.preventDefault();
      const submitBtn = e.target.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerText : 'Enregistrer';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = 'Enregistrement en cours...'; }

      const id = document.getElementById('serviceId').value;
      const title = document.getElementById('serviceTitle').value.trim();
      const title_ar = document.getElementById('serviceTitleAr').value.trim();
      const category = document.getElementById('serviceCategory').value;
      const duration = document.getElementById('serviceDuration').value.trim();
      const price = document.getElementById('servicePrice').value.trim();
      const display_order = parseInt(document.getElementById('serviceOrder').value, 10) || 1;
      const image_url = document.getElementById('serviceImageUrl').value.trim() || 'media/hydra_after.jpg';
      const description = document.getElementById('serviceDesc').value.trim();
      const description_ar = document.getElementById('serviceDescAr').value.trim();

      const payload = {
        title,
        title_ar: title_ar || title,
        category,
        duration,
        price,
        display_order,
        image_url,
        description,
        description_ar: description_ar || description,
        is_active: true
      };

      try {
        if (id) {
          const { error } = await supabaseClient.from('services').update(payload).eq('id', id);
          if (error) throw error;
          showToast('Soin mis à jour avec succès ! / تم تعديل الخدمة بنجاح');
        } else {
          const { error } = await supabaseClient.from('services').insert([payload]);
          if (error) throw error;
          showToast('Nouveau soin ajouté au catalogue ! / تمت إضافة الخدمة بنجاح');
        }
        closeServiceModal();
        await loadServices();
      } catch (err) {
        alert('Erreur: ' + err.message);
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerText = origText; }
      }
    }
`;

adminHtml = adminHtml.replace(/async function saveService[\s\S]*?loadServices\(\);\s*\}\s*catch[\s\S]*?\}\s*\}/, enhancedSaveService.trim());

fs.writeFileSync(adminPath, adminHtml, 'utf8');
console.log('Successfully enhanced public/admin.html!');


// 2. UPDATE public/index.html
const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Replace syncDataFromSupabase and render functions to handle empty arrays, gallery sync, and real-time
const enhancedIndexSync = `
    /* ==========================================================
       SUPABASE REAL-TIME INTEGRATION
    ========================================================== */
    const SUPABASE_CONFIG = {
      url: 'https://mtuhuzmyhbemdfsbyhpf.supabase.co',
      anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dWh1em15aGJlbWRmc2J5aHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjIxNDAsImV4cCI6MjA5MjQ5ODE0MH0.Pip_Y_FfjJvnOHxnAMNUlHMBLkGefVxH2dVMsXaIQ08'
    };

    let supabaseApp = null;
    window.DYNAMIC_SERVICES = [];
    window.DYNAMIC_OFFERS = [];
    window.DYNAMIC_GALLERY = [];

    try {
      if (window.supabase) {
        supabaseApp = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      }
    } catch (e) {
      console.warn('Supabase initialization failed, running with static fallback:', e);
    }

    // Fetch and sync services, offers & gallery from Supabase
    async function syncDataFromSupabase() {
      if (!supabaseApp) return;

      try {
        const [servicesRes, offersRes, galleryRes] = await Promise.all([
          supabaseApp.from('services').select('*').eq('is_active', true).order('display_order', { ascending: true }),
          supabaseApp.from('offers').select('*').eq('is_active', true).order('created_at', { ascending: false }),
          supabaseApp.from('gallery_images').select('*').order('created_at', { ascending: false })
        ]);

        if (!servicesRes.error && Array.isArray(servicesRes.data)) {
          window.DYNAMIC_SERVICES = servicesRes.data;
          renderSupabaseServices();
          updateServiceDropdown();
        }

        if (!offersRes.error && Array.isArray(offersRes.data)) {
          window.DYNAMIC_OFFERS = offersRes.data;
          renderSupabaseOffers();
        }

        if (!galleryRes.error && Array.isArray(galleryRes.data) && galleryRes.data.length > 0) {
          window.DYNAMIC_GALLERY = galleryRes.data;
          renderSupabaseGallery();
        }
      } catch (err) {
        console.warn('Could not sync with Supabase (using static fallback):', err);
      }
    }

    function renderSupabaseServices(categoryFilter = 'all') {
      const carousel = document.getElementById('soinsCarousel');
      if (!carousel) return;

      if (!window.DYNAMIC_SERVICES || window.DYNAMIC_SERVICES.length === 0) {
        // Retain static catalog if Supabase returned 0 items
        return;
      }

      const isAr = (currentLang === 'ar');
      const isEn = (currentLang === 'en');

      const filtered = (categoryFilter === 'all')
        ? window.DYNAMIC_SERVICES
        : window.DYNAMIC_SERVICES.filter(s => {
            const cat = (s.category || '').toLowerCase();
            if (categoryFilter === 'visage') return cat.includes('visage');
            if (categoryFilter === 'pieds') return cat.includes('pied') || cat.includes('callus');
            if (categoryFilter === 'ongles') return cat.includes('ongle') || cat.includes('main') || cat.includes('cils') || cat.includes('regard');
            if (categoryFilter === 'cheveux') return cat.includes('cheveu') || cat.includes('capill') || cat.includes('spa');
            return true;
          });

      if (filtered.length === 0) {
        carousel.innerHTML = '<p style="padding: 20px; color: var(--text-muted);">' + (isAr ? 'لا توجد خدمات في هذا القسم حالياً.' : 'Aucun soin disponible dans cette catégorie pour le moment.') + '</p>';
        return;
      }

      carousel.innerHTML = filtered.map(s => {
        const title = isAr && s.title_ar ? s.title_ar : s.title;
        const desc = isAr && s.description_ar ? s.description_ar : (s.description || '');
        const price = s.price || '';
        const duration = s.duration || '';
        const img = s.image_url || 'media/hydra_after.jpg';
        const bookText = isAr ? 'حجز الآن' : (isEn ? 'Book Now' : 'Réserver');

        return \`
          <article class="soin-card" data-category="\${s.category || 'all'}" onclick="bookSpecificService('\${title.replace(/'/g, "\\\\'")}')">
            <div class="soin-media">
              <img src="\${img}" alt="\${title}" onerror="this.src='media/hydra_after.jpg'">
              <div class="soin-floating-icon" title="\${title}">
                <svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              </div>
            </div>
            <div class="soin-info">
              <div>
                <h3 class="soin-name">\${title}</h3>
                <p class="soin-desc">\${desc}</p>
              </div>
              <div class="soin-meta">
                <span class="soin-price">\${price}</span>
                <span class="soin-duration">⏱ \${duration}</span>
              </div>
              <div class="soin-book-btn">
                <span>💬</span> <span>\${bookText}</span>
              </div>
            </div>
          </article>
        \`;
      }).join('');
    }

    function renderSupabaseOffers() {
      const container = document.getElementById('offersGridContainer');
      const wrap = document.getElementById('offresSpecialesWrap');
      if (!container) return;

      if (!window.DYNAMIC_OFFERS || window.DYNAMIC_OFFERS.length === 0) {
        if (wrap) wrap.style.display = 'none';
        container.innerHTML = '';
        return;
      }

      if (wrap) wrap.style.display = 'block';

      const isAr = (currentLang === 'ar');
      const isEn = (currentLang === 'en');
      const btnText = isAr ? 'حجز هذا العرض عبر واتساب' : (isEn ? 'Book this offer on WhatsApp' : 'Réserver cette offre sur WhatsApp');

      container.innerHTML = window.DYNAMIC_OFFERS.map(o => {
        const title = isAr && o.title_ar ? o.title_ar : o.title;
        const badge = isAr && o.badge_ar ? o.badge_ar : o.badge;
        const desc = isAr && o.description_ar ? o.description_ar : (o.description || '');
        const img = o.image_url || 'media/hydra_after.jpg';
        const waMsg = encodeURIComponent(
          isAr 
            ? \`مرحباً صالون جفان (JOVEN)، أود الاستفادة من هذا العرض الخاص: \${title} (\${o.new_price})\`
            : \`Bonjour JOVEN Institut, je souhaite profiter de votre offre spéciale : \${title} (\${o.new_price})\`
        );
        const waLink = \`https://wa.me/213781088061?text=\${waMsg}\`;

        return \`
          <div class="offer-card">
            <div class="offer-thumb">
              <img src="\${img}" alt="\${title}" onerror="this.src='media/hydra_after.jpg'">
              \${badge ? \`<span class="offer-badge">\${badge}</span>\` : ''}
            </div>
            <div class="offer-content">
              <h4 class="offer-card-title">\${title}</h4>
              <p class="offer-card-desc">\${desc}</p>
              <div class="offer-price-row">
                \${o.old_price ? \`<span class="offer-old-price">\${o.old_price}</span>\` : ''}
                <span class="offer-new-price">\${o.new_price}</span>
              </div>
              <a href="\${waLink}" target="_blank" rel="noopener" class="offer-btn">
                <span>💬</span> \${btnText}
              </a>
            </div>
          </div>
        \`;
      }).join('');
    }

    function renderSupabaseGallery() {
      if (!window.DYNAMIC_GALLERY || window.DYNAMIC_GALLERY.length === 0) return;
      const grid = document.querySelector('.galerie-grid');
      if (!grid) return;

      const isAr = (currentLang === 'ar');
      grid.innerHTML = window.DYNAMIC_GALLERY.map(g => \`
        <div class="galerie-item" onclick="openImageModal('\${g.image_url}', '\${(g.title || 'Photo JOVEN').replace(/'/g, "\\\\'")}')">
          <img src="\${g.image_url}" alt="\${g.title || 'Photo JOVEN Institut'}" onerror="this.src='media/salon_real_reception.jpg'">
          <div class="galerie-overlay">
            <strong>\${g.title || 'JOVEN Institut'}</strong>
            <span>\${g.category === 'salon' ? (isAr ? 'أجواء ومرافق الصالون' : 'Espace Institut') : (isAr ? 'نتائج حقيقية' : 'Résultat Soin')}</span>
          </div>
        </div>
      \`).join('');
    }

    function updateServiceDropdown() {
      const select = document.getElementById('serviceSelect');
      if (!select || !window.DYNAMIC_SERVICES || window.DYNAMIC_SERVICES.length === 0) return;

      const isAr = (currentLang === 'ar');
      select.innerHTML = window.DYNAMIC_SERVICES.map(s => {
        const title = isAr && s.title_ar ? s.title_ar : s.title;
        return \`<option value="\${title}">\${title} (\${s.price || ''})</option>\`;
      }).join('') + '<option value="Consultation sur place">Consultation sur place</option>';
    }

    // Setup Realtime Sync Listener
    function setupRealtimeListener() {
      if (!supabaseApp) return;
      try {
        supabaseApp.channel('public:db_changes')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => syncDataFromSupabase())
          .on('postgres_changes', { event: '*', schema: 'public', table: 'offers' }, () => syncDataFromSupabase())
          .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, () => syncDataFromSupabase())
          .subscribe();
      } catch (e) {
        console.warn('Realtime listener failed:', e);
      }
    }

    // Call sync on page load
    window.addEventListener('DOMContentLoaded', () => {
      syncDataFromSupabase();
      setupRealtimeListener();
    });
`;

// Replace the old block with the enhanced block
const startMarker = '/* ==========================================================\n       SUPABASE REAL-TIME INTEGRATION';
const endMarker = 'window.addEventListener(\'DOMContentLoaded\', () => {\n      syncDataFromSupabase();\n    });';

const startIdx = indexHtml.indexOf(startMarker);
const endIdx = indexHtml.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  indexHtml = indexHtml.slice(0, startIdx) + enhancedIndexSync.trim() + indexHtml.slice(endIdx + endMarker.length);
  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('Successfully enhanced public/index.html!');
} else {
  console.error('Could not find markers in index.html!', { startIdx, endIdx });
}
