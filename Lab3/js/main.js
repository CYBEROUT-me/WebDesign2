// ============================================================
// Lab 3 – JavaScript Calculator
// All HTML elements and styles created entirely via JavaScript.
// ============================================================

// ── State ──────────────────────────────────────────────────
let currentInput = '';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

// ── Helpers ────────────────────────────────────────────────
function el(tag, styles = {}, attrs = {}) {
  const element = document.createElement(tag);
  Object.assign(element.style, styles);
  Object.entries(attrs).forEach(([k, v]) => element.setAttribute(k, v));
  return element;
}

function applyResponsiveStyles() {
  const w = window.innerWidth;
  let btnSize, fontSize, displayFontSize, calcWidth;

  if (w <= 480) {
    // Mobile
    btnSize = '60px';
    fontSize = '1.3rem';
    displayFontSize = '1.8rem';
    calcWidth = '260px';
  } else if (w <= 768) {
    // Tablet
    btnSize = '72px';
    fontSize = '1.5rem';
    displayFontSize = '2rem';
    calcWidth = '310px';
  } else {
    // Desktop
    btnSize = '80px';
    fontSize = '1.6rem';
    displayFontSize = '2.2rem';
    calcWidth = '344px';
  }

  wrapper.style.width = calcWidth;

  buttons.forEach(btn => {
    btn.style.height = btnSize;
    if (btn.dataset.span === '2') {
      btn.style.width = `calc(${btnSize} * 2 + 8px)`;
    } else {
      btn.style.width = btnSize;
    }
    btn.style.fontSize = fontSize;
  });

  display.style.fontSize = displayFontSize;
}

// ── Calculator logic ────────────────────────────────────────
function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷':
      if (b === 0) return 'Error';
      return a / b;
    default: return b;
  }
}

function updateDisplay(value) {
  display.textContent = value || '0';
}

function handleNumber(num) {
  if (shouldResetScreen) {
    currentInput = '';
    shouldResetScreen = false;
  }
  if (num === '.' && currentInput.includes('.')) return;
  if (currentInput === '0' && num !== '.') currentInput = num;
  else currentInput += num;
  updateDisplay(currentInput);
}

function handleOperator(op) {
  if (currentInput === '' && previousInput === '') return;

  if (previousInput !== '' && currentInput !== '' && !shouldResetScreen) {
    const result = calculate(previousInput, currentInput, operator);
    currentInput = String(result);
    updateDisplay(currentInput);
  }

  operator = op;
  previousInput = currentInput || previousInput;
  currentInput = '';
  shouldResetScreen = false;

  // Highlight active operator
  buttons.forEach(b => {
    b.style.background = b.dataset.op === op
      ? operatorActiveColor
      : (b.dataset.type === 'operator' ? operatorColor : (b.dataset.type === 'action' ? actionColor : numberColor));
  });
}

function handleEquals() {
  if (operator === null || previousInput === '' || currentInput === '') return;
  const result = calculate(previousInput, currentInput, operator);
  updateDisplay(result);
  previousInput = '';
  operator = null;
  currentInput = String(result);
  shouldResetScreen = true;

  // Remove operator highlight
  buttons.forEach(b => {
    if (b.dataset.type === 'operator') b.style.background = operatorColor;
  });
}

function handleClear() {
  currentInput = '';
  previousInput = '';
  operator = null;
  shouldResetScreen = false;
  updateDisplay('0');
  buttons.forEach(b => {
    if (b.dataset.type === 'operator') b.style.background = operatorColor;
  });
}

function handleBackspace() {
  if (shouldResetScreen) return;
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || '0');
}

function handlePlusMinus() {
  if (!currentInput) return;
  currentInput = String(parseFloat(currentInput) * -1);
  updateDisplay(currentInput);
}

function handlePercent() {
  if (!currentInput) return;
  currentInput = String(parseFloat(currentInput) / 100);
  updateDisplay(currentInput);
}

// ── Colors ──────────────────────────────────────────────────
const bg           = '#1c1c1e';
const displayBg    = '#2c2c2e';
const numberColor  = '#3a3a3c';
const numberHover  = '#4a4a4c';
const operatorColor       = '#ff9f0a';
const operatorActiveColor = '#ffffff';
const operatorTextColor   = '#ffffff';
const actionColor  = '#636366';
const actionHover  = '#7a7a7e';
const equalColor   = '#ff9f0a';
const equalHover   = '#e8890a';
const textLight    = '#ffffff';

// ── Build DOM ───────────────────────────────────────────────

// Page background
document.body.style.cssText = `
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

// Wrapper
const wrapper = el('div', {
  background: bg,
  borderRadius: '20px',
  padding: '16px',
  boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});
document.body.appendChild(wrapper);

// Display
const display = el('div', {
  background: displayBg,
  borderRadius: '12px',
  padding: '16px 20px',
  textAlign: 'right',
  color: textLight,
  fontSize: '2.2rem',
  fontWeight: '300',
  minHeight: '72px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  wordBreak: 'break-all',
  overflowX: 'auto',
  marginBottom: '8px',
  letterSpacing: '-0.5px',
});
display.textContent = '0';
wrapper.appendChild(display);

// Button grid
const grid = el('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '8px',
});
wrapper.appendChild(grid);

// Button definitions: [label, type, action, span?]
const buttonDefs = [
  ['AC', 'action', 'clear'],
  ['+/−', 'action', 'plusminus'],
  ['%', 'action', 'percent'],
  ['÷', 'operator', 'operator'],
  ['7', 'number', 'number'],
  ['8', 'number', 'number'],
  ['9', 'number', 'number'],
  ['×', 'operator', 'operator'],
  ['4', 'number', 'number'],
  ['5', 'number', 'number'],
  ['6', 'number', 'number'],
  ['−', 'operator', 'operator'],
  ['1', 'number', 'number'],
  ['2', 'number', 'number'],
  ['3', 'number', 'number'],
  ['+', 'operator', 'operator'],
  ['0', 'number', 'number', 2],  // spans 2 columns
  ['.', 'number', 'number'],
  ['=', 'equal', 'equals'],
];

const buttons = [];

buttonDefs.forEach(([label, type, action, span]) => {
  const bgColor = type === 'operator' ? operatorColor
                : type === 'action'   ? actionColor
                : type === 'equal'    ? equalColor
                : numberColor;

  const textColor = textLight;

  const btn = el('button', {
    background: bgColor,
    color: textColor,
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.6rem',
    fontWeight: '400',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: span === 2 ? 'flex-start' : 'center',
    paddingLeft: span === 2 ? '28px' : '0',
    transition: 'filter 0.1s, transform 0.1s',
    outline: 'none',
    gridColumn: span === 2 ? 'span 2' : 'span 1',
    borderRadius: span === 2 ? '40px' : '50%',
  });

  btn.textContent = label;
  btn.dataset.type = type;
  btn.dataset.action = action;
  btn.dataset.label = label;
  if (type === 'operator') btn.dataset.op = label;
  if (span === 2) btn.dataset.span = '2';

  // Hover effects
  btn.addEventListener('mouseenter', () => {
    btn.style.filter = 'brightness(1.2)';
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.filter = 'brightness(1)';
    btn.style.transform = 'scale(1)';
  });
  btn.addEventListener('mousedown', () => {
    btn.style.filter = 'brightness(0.85)';
    btn.style.transform = 'scale(0.96)';
  });
  btn.addEventListener('mouseup', () => {
    btn.style.filter = 'brightness(1.2)';
    btn.style.transform = 'scale(1.05)';
  });

  // Click handler
  btn.addEventListener('click', () => {
    switch (action) {
      case 'number':    handleNumber(label);    break;
      case 'operator':  handleOperator(label);  break;
      case 'equals':    handleEquals();         break;
      case 'clear':     handleClear();          break;
      case 'plusminus': handlePlusMinus();      break;
      case 'percent':   handlePercent();        break;
    }
  });

  grid.appendChild(btn);
  buttons.push(btn);
});

// ── Keyboard support ────────────────────────────────────────
const keyMap = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '.': '.', ',': '.',
  '+': '+', '-': '−', '*': '×', '/': '÷',
  'Enter': '=', '=': '=',
  'Backspace': 'backspace',
  'Escape': 'AC',
  '%': '%',
};

document.addEventListener('keydown', e => {
  const mapped = keyMap[e.key];
  if (!mapped) return;
  e.preventDefault();

  if (mapped === 'backspace') { handleBackspace(); return; }

  const match = buttons.find(b => b.dataset.label === mapped);
  if (match) {
    match.click();
    match.style.filter = 'brightness(0.85)';
    setTimeout(() => match.style.filter = 'brightness(1)', 120);
  }
});

// ── Responsive ──────────────────────────────────────────────
applyResponsiveStyles();
window.addEventListener('resize', applyResponsiveStyles);
