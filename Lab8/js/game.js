// ============================================================
// Lab 8 – Number Sequence Game
// ============================================================

const GRID_SIZE  = 25;  // 5×5 grid, numbers 1–25
const TIME_LIMIT = 60;  // seconds per round

const FONT_SIZES = ['0.9rem', '1.2rem', '1.6rem', '2rem', '2.5rem'];

let nextExpected  = 1;
let timerInterval = null;
let timeLeft      = TIME_LIMIT;
let gameActive    = false;
let gameCount     = 0;
let stats         = []; // [{ label, elapsed }]

// ── Helpers ──────────────────────────────────────────────────
function randHsl() {
  const h = Math.floor(Math.random() * 360);
  const s = 55 + Math.floor(Math.random() * 30);
  const l = 45 + Math.floor(Math.random() * 20);
  return `hsl(${h},${s}%,${l}%)`;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── Grid ─────────────────────────────────────────────────────
function renderGrid() {
  const grid    = document.getElementById('grid');
  grid.innerHTML = '';

  const numbers = shuffle([...Array(GRID_SIZE)].map((_, i) => i + 1));

  numbers.forEach(n => {
    const cell = document.createElement('div');
    cell.className          = 'cell';
    cell.textContent        = n;
    cell.dataset.value      = n;
    cell.style.color        = randHsl();
    cell.style.fontSize     = FONT_SIZES[Math.floor(Math.random() * FONT_SIZES.length)];
    cell.addEventListener('click', () => handleCellClick(n, cell));
    grid.appendChild(cell);
  });
}

// ── Game logic ───────────────────────────────────────────────
function handleCellClick(n, cell) {
  if (!gameActive) return;

  if (n === nextExpected) {
    cell.classList.add('selected');
    nextExpected++;

    if (nextExpected > GRID_SIZE) {
      winGame();
    }
  } else {
    showMessage('Не вірна цифра!', 'error');
  }
}

function startGame() {
  clearInterval(timerInterval);
  nextExpected = 1;
  timeLeft     = TIME_LIMIT;
  gameActive   = true;
  gameCount++;

  document.getElementById('timer').textContent = timeLeft;
  clearMessage();
  renderGrid();

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameActive = false;
      showMessage('Час вийшов! Натисніть "Почати з початку".', 'timeout');
    }
  }, 1000);
}

function winGame() {
  clearInterval(timerInterval);
  gameActive = false;

  const elapsed = TIME_LIMIT - timeLeft;
  stats.push({ label: `Гра ${gameCount}`, elapsed });
  renderStats();

  showMessage(
    `Вітаємо! Ви пройшли гру за ${elapsed} с. Починаємо знову...`,
    'success'
  );

  setTimeout(startGame, 2000);
}

// ── UI helpers ───────────────────────────────────────────────
function showMessage(text, type) {
  const el = document.getElementById('message');
  el.textContent = text;
  el.className   = `message ${type}`;

  if (type === 'error') {
    setTimeout(() => {
      if (el.textContent === text) clearMessage();
    }, 1200);
  }
}

function clearMessage() {
  const el = document.getElementById('message');
  el.textContent = '';
  el.className   = 'message';
}

// ── Stats table ──────────────────────────────────────────────
function renderStats() {
  const section = document.getElementById('statsSection');
  const tbody   = document.getElementById('statsBody');

  section.style.display = 'block';
  tbody.innerHTML = '';

  const minElapsed = Math.min(...stats.map(s => s.elapsed));

  stats.forEach(s => {
    const tr = document.createElement('tr');
    if (s.elapsed === minElapsed) tr.classList.add('best');
    tr.innerHTML = `<td>${s.label}</td><td>${s.elapsed} с.</td>`;
    tbody.appendChild(tr);
  });
}

// ── Init ─────────────────────────────────────────────────────
document.getElementById('restartBtn').addEventListener('click', startGame);
startGame();
