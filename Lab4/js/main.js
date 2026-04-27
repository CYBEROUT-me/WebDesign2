// ============================================================
// Lab 4 – Functions & Arrays
// ============================================================

function addLine(containerId, text, cls = '') {
  const container = document.getElementById(containerId)
    || document.querySelector(`#${containerId} .output`);
  const div = document.createElement('div');
  div.className = 'line' + (cls ? ' ' + cls : '');
  div.textContent = text;
  container.appendChild(div);
}

function addToSection(sectionId, text, cls = '') {
  const out = document.querySelector(`#${sectionId} .output`);
  const div = document.createElement('div');
  div.className = 'line' + (cls ? ' ' + cls : '');
  div.textContent = text;
  out.appendChild(div);
}

// ── Task 1: seconds ─────────────────────────────────────────
function seconds(total) {
  return total % 60;
}

addToSection('task1', `seconds(125)  → ${seconds(125)}`);
addToSection('task1', `seconds(60)   → ${seconds(60)}`);
addToSection('task1', `seconds(90)   → ${seconds(90)}`);
addToSection('task1', `seconds(3725) → ${seconds(3725)}`);

// ── Task 2: perimeter ───────────────────────────────────────
function perimeter(side, count) {
  return count * side;
}

addToSection('task2', `perimeter(5, 4)  = ${perimeter(5, 4)}   (square)`);
addToSection('task2', `perimeter(3, 6)  = ${perimeter(3, 6)}   (hexagon)`);
addToSection('task2', `perimeter(10, 3) = ${perimeter(10, 3)}  (triangle)`);

// ── Task 3: FizzBuzz ────────────────────────────────────────
function fizzBuzz(n) {
  const out = document.getElementById('task3-out');
  out.innerHTML = '';
  for (let i = 1; i <= n; i++) {
    let word;
    if (i % 15 === 0)     word = 'fizzbuzz';
    else if (i % 3 === 0) word = 'fizz';
    else if (i % 5 === 0) word = 'buzz';
    else                  word = String(i);

    const cls = word === 'fizzbuzz' ? 'ok' : word === 'fizz' ? 'info' : word === 'buzz' ? 'bad' : '';
    const div = document.createElement('div');
    div.className = 'line' + (cls ? ' ' + cls : '');
    div.textContent = `${String(i).padStart(3)}: ${word}`;
    out.appendChild(div);
    console.log(word);
  }
}

function runFizzBuzz() {
  const n = parseInt(document.getElementById('fizzN').value) || 20;
  fizzBuzz(n);
}
runFizzBuzz();

// ── Task 4: Calculate (arithmetic mean) ────────────────────
function Calculate(a, b, c) {
  const avg = (a + b + c) / 3;
  console.log(`Average of ${a}, ${b}, ${c} = ${avg}`);
  return avg;
}

addToSection('task4', `Calculate(3, 6, 9)     = ${Calculate(3, 6, 9)}`);
addToSection('task4', `Calculate(10, 20, 30)  = ${Calculate(10, 20, 30)}`);
addToSection('task4', `Calculate(7, 14, 21)   = ${Calculate(7, 14, 21)}`);

// ── Task 5: isDivisible ─────────────────────────────────────
// With if
function isDivisibleIf(n, x, y) {
  if (n % x === 0 && n % y === 0) return true;
  return false;
}

// With ternary operator
function isDivisibleTernary(n, x, y) {
  return (n % x === 0 && n % y === 0) ? true : false;
}

// Without if and ternary
function isDivisiblePlain(n, x, y) {
  return n % x === 0 && n % y === 0;
}

addToSection('task5', '--- With if ---', 'sep');
addToSection('task5', `isDivisibleIf(12, 3, 4)      → ${isDivisibleIf(12, 3, 4)}`);
addToSection('task5', `isDivisibleIf(12, 5, 3)      → ${isDivisibleIf(12, 5, 3)}`);
addToSection('task5', '--- With ternary ---', 'sep');
addToSection('task5', `isDivisibleTernary(30, 5, 3) → ${isDivisibleTernary(30, 5, 3)}`);
addToSection('task5', `isDivisibleTernary(12, 4, 5) → ${isDivisibleTernary(12, 4, 5)}`);
addToSection('task5', '--- Without if/ternary ---', 'sep');
addToSection('task5', `isDivisiblePlain(30, 5, 3)   → ${isDivisiblePlain(30, 5, 3)}`);

// ── Task 6: Array stats ─────────────────────────────────────
const arr6 = [15, -3, 42, 7, -12, 88, 5, 23, -1, 60];
const max6 = Math.max(...arr6);
const min6 = Math.min(...arr6);
const sum6 = arr6.reduce((a, v) => a + v, 0);
const avg6 = sum6 / arr6.length;
const odds6 = arr6.filter(v => v % 2 !== 0);

addToSection('task6', `Array:   [${arr6.join(', ')}]`);
addToSection('task6', `Max:     ${max6}`, 'ok');
addToSection('task6', `Min:     ${min6}`, 'bad');
addToSection('task6', `Sum:     ${sum6}`, 'info');
addToSection('task6', `Average: ${avg6}`, 'info');
addToSection('task6', `Odd values: [${odds6.join(', ')}]`);

// ── Task 7: 2D array diagonal replacement ──────────────────
const matrix = [
  [ 3, -2,  5, -1,  7],
  [-4,  8, -3,  2, -6],
  [ 1, -5,  9, -8,  4],
  [-7,  6, -2, -4,  3],
  [ 2, -9,  1, -3,  5],
];

addToSection('task7', 'Original matrix:', 'sep');
matrix.forEach(row => addToSection('task7', row.map(v => String(v).padStart(4)).join('')));

for (let i = 0; i < 5; i++) {
  matrix[i][i] = matrix[i][i] < 0 ? 0 : 1;
}

addToSection('task7', 'After diagonal (negative → 0, positive → 1):', 'sep');
matrix.forEach(row => addToSection('task7', row.map(v => String(v).padStart(4)).join('')));

// ── Task 8: Arithmetic functions ────────────────────────────
function Add(a, b) { return a + b; }
function Sub(a, b) { return a - b; }
function Mul(a, b) { return a * b; }
function Div(a, b) {
  if (b === 0) return 'Error: division by zero';
  return a / b;
}

function runArithmetic() {
  const a = parseFloat(document.getElementById('t8a').value);
  const b = parseFloat(document.getElementById('t8b').value);
  const op = document.getElementById('t8op').value;
  const out = document.getElementById('task8-out');
  out.innerHTML = '';

  const symbols = { add: '+', sub: '−', mul: '×', div: '÷' };
  const fns = { add: Add, sub: Sub, mul: Mul, div: Div };
  const result = fns[op](a, b);

  const div = document.createElement('div');
  div.className = 'line ok';
  div.textContent = `${a} ${symbols[op]} ${b} = ${result}`;
  out.appendChild(div);
}

// ── Task 9: Number properties ───────────────────────────────
function isPrime(n) {
  const num = Math.abs(n);
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function runAnalyze() {
  const n = parseInt(document.getElementById('t9n').value);
  const out = document.getElementById('task9-out');
  out.innerHTML = '';

  const lines = [
    [`Number: ${n}`, ''],
    [n > 0 ? 'Positive' : n < 0 ? 'Negative' : 'Zero', n > 0 ? 'ok' : 'bad'],
    [`Prime: ${isPrime(n)}`, isPrime(n) ? 'ok' : ''],
  ];
  [2, 5, 3, 6, 9].forEach(d => {
    lines.push([`Divisible by ${d}: ${n % d === 0}`, n % d === 0 ? 'ok' : '']);
  });

  lines.forEach(([text, cls]) => {
    const div = document.createElement('div');
    div.className = 'line' + (cls ? ' ' + cls : '');
    div.textContent = text;
    out.appendChild(div);
  });
}
runAnalyze();

// ── Task 10: Reverse & square numerics ─────────────────────
function reverseSquare(inputArr) {
  return [...inputArr].reverse().map(v => (typeof v === 'number' ? v * v : v));
}

const mixed = [1, 'hello', 3, 'world', 5];
addToSection('task10', `Input:  [${mixed.join(', ')}]`);
addToSection('task10', `Result: [${reverseSquare(mixed).join(', ')}]`, 'ok');

const nums = [2, 4, 6, 8, 10];
addToSection('task10', `Input:  [${nums.join(', ')}]`);
addToSection('task10', `Result: [${reverseSquare(nums).join(', ')}]`, 'ok');

// ── Task 11: Remove duplicates ──────────────────────────────
function removeDuplicates(inputArr) {
  return [...new Set(inputArr)];
}

const withDups = [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6];
addToSection('task11', `Input:  [${withDups.join(', ')}]`);
addToSection('task11', `Result: [${removeDuplicates(withDups).join(', ')}]`, 'ok');
