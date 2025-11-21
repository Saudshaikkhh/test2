const display = document.getElementById('display');
const buttons = document.getElementById('buttons');

let expr = '';

function updateDisplay() {
  display.textContent = expr || '0';
}

function safeEvaluate(input) {
  // convert visible operators to JS ones
  let s = input.replace(/×/g, '*').replace(/÷/g, '/');
  // convert percent like 50% to (50/100)
  s = s.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
  // allow only numbers, operators, parentheses, dot and spaces
  if (!/^[0-9+\-*/().%\s]+$/.test(s)) throw new Error('Invalid characters');
  // evaluate
  // eslint-disable-next-line no-new-func
  return Function('return ' + s)();
}

buttons.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
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
