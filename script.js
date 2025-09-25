// Mobile menu
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

if (hamburger && menu) {
  hamburger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close after click
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
}

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Lightweight form validation + status
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function setError(id, msg) {
  const el = document.querySelector(`.error[data-for="${id}"]`);
  if (el) el.textContent = msg || '';
}

function validEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic checks
    let ok = true;
    setError('name'); setError('email'); setError('message');

    if (!name) { setError('name', 'Please enter your name.'); ok = false; }
    if (!email || !validEmail(email)) { setError('email', 'Enter a valid email.'); ok = false; }
    if (!message) { setError('message', 'Please add a short message.'); ok = false; }

    if (!ok) return;

    statusEl.textContent = 'Sending…';

    try {
      const fd = new FormData(form);
      const res = await fetch(form.action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' }});
      if (res.ok) {
        form.reset();
        statusEl.textContent = 'Thanks! I will get back to you shortly.';
      } else {
        statusEl.textContent = 'Something went wrong. Please email me directly.';
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Please try again later.';
    }
  });
}
