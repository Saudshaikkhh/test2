const display = document.getElementById('display');
const buttons = document.getElementById('buttons');

let expr = '';

function updateDisplay() {
  display.textContent = expr || '0';
}

function safeEvaluate(input) {
  // Small site JS: nav toggle and contact form handling for demo landing page
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
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
  const action = btn.dataset.action;
  const val = btn.dataset.value;

  if (action === 'clear') {
    expr = '';
    updateDisplay();
    return;
  }
  if (action === 'back') {
    expr = expr.slice(0, -1);
    updateDisplay();
    return;
  }
  if (action === 'percent') {
    expr += '%';
    updateDisplay();
    return;
  }
  if (action === 'equals') {
    try {
      const result = safeEvaluate(expr || '0');
      expr = String(result);
    } catch (err) {
      expr = 'Error';
    }
    updateDisplay();
    return;
  }

  // regular value (number / operator / dot)
  if (val) {
    expr += val;
    updateDisplay();
  }
});

// keyboard support
window.addEventListener('keydown', (e) => {
  const allowed = '0123456789+-*/().%';
  if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    try {
      expr = String(safeEvaluate(expr || '0'));
    } catch (err) {
      expr = 'Error';
    }
    updateDisplay();
    return;
  }
  if (e.key === 'Backspace') {
    e.preventDefault();
    expr = expr.slice(0, -1);
    updateDisplay();
    return;
  }
  if (e.key === 'Escape') {
    expr = '';
    updateDisplay();
    return;
  }
  if (allowed.includes(e.key)) {
    expr += e.key;
    updateDisplay();
    return;
  }
});

updateDisplay();
