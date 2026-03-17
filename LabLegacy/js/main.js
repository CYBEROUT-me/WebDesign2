// ============================================================
// Lab Legacy – JavaScript Fundamentals
// ============================================================

// ── Task 1 – Prime numbers 0–100 (while loop) ──────────────
document.getElementById('btn-primes').addEventListener('click', () => {
  const box = document.getElementById('result-primes');
  let primes = [];
  let n = 2;

  while (n <= 100) {
    let isPrime = true;
    let i = 2;
    while (i <= Math.sqrt(n)) {
      if (n % i === 0) { isPrime = false; break; }
      i++;
    }
    if (isPrime) primes.push(n);
    n++;
  }

  box.innerHTML = primes
    .map(p => `<span class="tag-prime">${p}</span>`)
    .join(' ');
});


// ── Task 2 – Even / Odd classifier (do...while) ─────────────
function classifyNumbers() {
  const lines = [];
  let num = 0;

  do {
    let label;
    if (num === 0)       label = `<span class="tag-zero">0 – це нуль</span>`;
    else if (num % 2 !== 0) label = `<span class="tag-odd">${num} – непарне число</span>`;
    else                 label = `<span class="tag-even">${num} – парне число</span>`;
    lines.push(label);
    num++;
  } while (num <= 10);

  return lines.join('<br>');
}

document.getElementById('btn-evenodd').addEventListener('click', () => {
  document.getElementById('result-evenodd').innerHTML = classifyNumbers();
});


// ── Task 3 – Division loop ───────────────────────────────────
document.getElementById('btn-division').addEventListener('click', () => {
  let numb = 10000;
  let result = numb;
  let counter = 0;

  while (result >= 50) {
    result = result / 2;
    counter++;
  }

  document.getElementById('result-division').innerHTML =
    `Iterations: <strong>${counter}</strong><br>` +
    `Final result: <strong>${result.toFixed(6)}</strong>`;

  console.log('Division loop — result:', result, '| counter:', counter);
});


// ── Task 4 – Season detector ─────────────────────────────────
const monthNames = [
  '', 'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function getSeason(month) {
  if (month === 12 || month <= 2)  return 'Winter ❄️';
  if (month >= 3 && month <= 5)    return 'Spring 🌸';
  if (month >= 6 && month <= 8)    return 'Summer ☀️';
  return 'Autumn 🍂';
}

document.getElementById('btn-season').addEventListener('click', () => {
  const raw = document.getElementById('input-month').value.trim();
  const month = parseInt(raw, 10);
  const box = document.getElementById('result-season');

  if (isNaN(month) || month < 1 || month > 12) {
    box.innerHTML = '<span style="color:red">Please enter a number between 1 and 12.</span>';
    return;
  }

  const season = getSeason(month);
  const name = monthNames[month];
  box.innerHTML =
    `Month: <strong>${name}</strong><br>` +
    `Season: <span class="tag-season">${season}</span>`;
});


// ── Task 5 – Temperature converter (°C → °F) ─────────────────
document.getElementById('btn-temp').addEventListener('click', () => {
  const raw = document.getElementById('input-celsius').value.trim();
  const celsius = parseFloat(raw);
  const box = document.getElementById('result-temp');

  if (isNaN(celsius)) {
    box.innerHTML = '<span style="color:red">Please enter a valid temperature.</span>';
    return;
  }

  const fahrenheit = (9 / 5) * celsius + 32;
  box.innerHTML =
    `<span class="tag-temp">${celsius}°C = ${fahrenheit.toFixed(2)}°F</span>`;
});


// ── Task 6 – Day of week ─────────────────────────────────────
const days = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

document.getElementById('btn-day').addEventListener('click', () => {
  const raw = document.getElementById('input-day').value.trim();
  const num = parseInt(raw, 10);
  const box = document.getElementById('result-day');

  if (isNaN(num) || num < 1 || num > 7) {
    box.innerHTML = '<span style="color:red">Please enter a number between 1 and 7.</span>';
    return;
  }

  box.innerHTML = `<span class="tag-day">${num} → ${days[num]}</span>`;
});
