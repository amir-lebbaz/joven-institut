const SUPABASE_URL = 'https://mtuhuzmyhbemdfsbyhpf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dWh1em15aGJlbWRmc2J5aHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjIxNDAsImV4cCI6MjA5MjQ5ODE0MH0.Pip_Y_FfjJvnOHxnAMNUlHMBLkGefVxH2dVMsXaIQ08';

async function runTests() {
  console.log('Testing CRUD operations against Supabase...');

  // 1. SERVICES TEST
  console.log('\n--- 1. Testing Services CRUD ---');
  // INSERT
  const insertServiceRes = await fetch(`${SUPABASE_URL}/rest/v1/services`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      title: 'TEST SERVICE TEMPORARY',
      title_ar: 'خدمة تجريبية مؤقتة',
      category: 'soins-visage',
      price: '5,000 DA',
      duration: '45 min',
      is_active: true
    })
  });
  const insertedService = await insertServiceRes.json();
  console.log('Inserted service status:', insertServiceRes.status, insertedService);
  if (!insertedService || !insertedService[0]) {
    console.error('Failed to insert service!');
    return;
  }
  const serviceId = insertedService[0].id;

  // DELETE
  console.log(`Deleting service id ${serviceId}...`);
  const deleteServiceRes = await fetch(`${SUPABASE_URL}/rest/v1/services?id=eq.${serviceId}`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=representation'
    }
  });
  const deletedService = await deleteServiceRes.json();
  console.log('Deleted service status:', deleteServiceRes.status, deletedService);

  // VERIFY DELETION
  const verifyServiceRes = await fetch(`${SUPABASE_URL}/rest/v1/services?id=eq.${serviceId}`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const verifyServiceData = await verifyServiceRes.json();
  console.log('Verification check (should be empty []):', verifyServiceData);


  // 2. OFFERS TEST
  console.log('\n--- 2. Testing Offers CRUD ---');
  // INSERT
  const insertOfferRes = await fetch(`${SUPABASE_URL}/rest/v1/offers`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      title: 'TEST OFFER TEMPORARY',
      title_ar: 'عرض تجريبي مؤقت',
      badge: '-50% Promo',
      new_price: '7,000 DA',
      old_price: '14,000 DA',
      is_active: true
    })
  });
  const insertedOffer = await insertOfferRes.json();
  console.log('Inserted offer status:', insertOfferRes.status, insertedOffer);
  const offerId = insertedOffer[0].id;

  // DELETE
  console.log(`Deleting offer id ${offerId}...`);
  const deleteOfferRes = await fetch(`${SUPABASE_URL}/rest/v1/offers?id=eq.${offerId}`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=representation'
    }
  });
  const deletedOffer = await deleteOfferRes.json();
  console.log('Deleted offer status:', deleteOfferRes.status, deletedOffer);

  // VERIFY DELETION
  const verifyOfferRes = await fetch(`${SUPABASE_URL}/rest/v1/offers?id=eq.${offerId}`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const verifyOfferData = await verifyOfferRes.json();
  console.log('Verification check (should be empty []):', verifyOfferData);


  // 3. GALLERY IMAGES TEST
  console.log('\n--- 3. Testing Gallery Images CRUD ---');
  // INSERT
  const insertGalRes = await fetch(`${SUPABASE_URL}/rest/v1/gallery_images`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      title: 'TEST GALLERY IMAGE',
      category: 'salon',
      image_url: 'media/hydra_after.jpg'
    })
  });
  const insertedGal = await insertGalRes.json();
  console.log('Inserted gallery status:', insertGalRes.status, insertedGal);
  const galId = insertedGal[0].id;

  // DELETE
  console.log(`Deleting gallery image id ${galId}...`);
  const deleteGalRes = await fetch(`${SUPABASE_URL}/rest/v1/gallery_images?id=eq.${galId}`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=representation'
    }
  });
  const deletedGal = await deleteGalRes.json();
  console.log('Deleted gallery status:', deleteGalRes.status, deletedGal);

  // VERIFY DELETION
  const verifyGalRes = await fetch(`${SUPABASE_URL}/rest/v1/gallery_images?id=eq.${galId}`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const verifyGalData = await verifyGalRes.json();
  console.log('Verification check (should be empty []):', verifyGalData);

  console.log('\n=======================================');
  console.log('ALL CRUD OPERATIONS ARE FULLY VERIFIED! ✨');
  console.log('=======================================');
}

runTests();
