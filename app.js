// Site JS for demo landing page: nav toggle, demo contact form handling, smooth scroll
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');
  const contactForm = document.getElementById('contactForm');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (nav) nav.classList.toggle('open');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name') || 'Guest';
      // In a real site you'd send this to a backend. Here we just show a demo message.
      alert('Thanks, ' + name + '! Your message was received (demo).');
      contactForm.reset();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
