// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
  });
  // Close menu when a link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth < 720) navLinks.style.display = 'none';
    });
  });
}

// Smooth scroll offset for sticky nav (optional enhancement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const yOffset = -60; // approx nav height
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});

// Back to top button
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    toTop.style.display = 'block';
  } else {
    toTop.style.display = 'none';
  }
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple contact form validation + demo submission
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function setError(id, msg) {
  const small = document.querySelector(`small[data-for="${id}"]`);
  if (small) small.textContent = msg || '';
}
function clearErrors() {
  ['name','email','phone','service'].forEach(id => setError(id, ''));
}

function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function validPhone(v){ return /^\+?[0-9\s-]{8,}$/.test(v); }

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();
  statusEl.textContent = '';

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    service: form.service.value.trim(),
    message: form.message.value.trim()
  };

  let ok = true;
  if (!data.name){ setError('name','Please enter your name'); ok=false; }
  if (!validEmail(data.email)){ setError('email','Enter a valid email'); ok=false; }
  if (!validPhone(data.phone)){ setError('phone','Enter a valid phone/WhatsApp'); ok=false; }
  if (!data.service){ setError('service','Select a service'); ok=false; }

  if (!ok) return;

  // Demo: simulate sending. Replace with your backend or form service.
  try {
    // Example using a form endpoint (Formspree, Getform, Basin, etc.)
    // await fetch('[formspree.io](https://formspree.io/f/yourid)', {
    //   method:'POST',
    //   headers:{'Content-Type':'application/json'},
    //   body: JSON.stringify(data)
    // });

    await new Promise(r => setTimeout(r, 800));
    statusEl.textContent = 'Thanks! Your enquiry has been sent. I will get back to you shortly.';
    form.reset();
  } catch (err) {
    statusEl.style.color = '#ff9b9b';
    statusEl.textContent = 'Something went wrong. Please email yourmail@example.com or WhatsApp.';
  }
});
