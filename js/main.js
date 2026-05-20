// ---- Navigation: transparent -> white on scroll ----
const nav = document.querySelector('.nav');

function updateNav() {
  if (!nav) return;
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
    nav.classList.remove('transparent');
  } else {
    nav.classList.remove('scrolled');
    nav.classList.add('transparent');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ---- Burger menu ----
const burger   = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');

burger?.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger?.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ---- Fade-up on scroll ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ---- Menu tabs (speisekarte.html) ----
const tabBtns  = document.querySelectorAll('.tab-btn');
const panels   = document.querySelectorAll('.menu-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector(`.menu-panel[data-panel="${btn.dataset.tab}"]`)?.classList.add('active');

    // scroll tabs into view on mobile
    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });
});

// ---- Reservation form ----
const form = document.getElementById('resForm');

if (form) {
  // Set minimum date (tomorrow)
  const dateInput = form.querySelector('#resDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const d = new FormData(form);
    const name   = d.get('name');
    const date   = d.get('date');
    const time   = d.get('time');
    const guests = d.get('guests');
    const phone  = d.get('phone');
    const email  = d.get('email');
    const notes  = d.get('notes') || '';

    const subject = `Reservierungsanfrage: ${name}, ${date} um ${time} Uhr`;
    const body =
      `Name: ${name}\n` +
      `Datum: ${date}\n` +
      `Uhrzeit: ${time} Uhr\n` +
      `Personen: ${guests}\n` +
      `Telefon: ${phone}\n` +
      `E-Mail: ${email}\n` +
      (notes ? `\nBesondere Wünsche:\n${notes}` : '');

    window.location.href =
      `mailto:reservation@laoxiang.de` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    // Success state
    form.innerHTML = `
      <div class="form-success">
        <p class="form-success-icon">✓</p>
        <h3>Anfrage gesendet!</h3>
        <p>Wir melden uns innerhalb von 24 Stunden bei Ihnen.<br>
           Alternativ erreichen Sie uns unter <a href="tel:+493089642113" style="color:var(--gold)">+49 30 89642113</a>.</p>
      </div>`;
  });
}
