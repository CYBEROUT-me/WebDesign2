// ============================================================
// Lab 7 – Strings & Date
// ============================================================

// ── Task 1: Date/time formatter ─────────────────────────────
const DAYS_UA = [
  'неділя', 'понеділок', 'вівторок', 'середа',
  'четвер', 'п\'ятниця', 'субота',
];

const MONTHS_UA = [
  'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
  'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня',
];

function getCurrentTime() {
  const now = new Date();

  const h   = String(now.getHours()).padStart(2, '0');
  const m   = String(now.getMinutes()).padStart(2, '0');
  const s   = String(now.getSeconds()).padStart(2, '0');
  const day = DAYS_UA[now.getDay()];
  const dd  = String(now.getDate()).padStart(2, '0');
  const mon = MONTHS_UA[now.getMonth()];
  const yr  = now.getFullYear();

  const formatted = `${h}:${m}:${s}, ${day}, ${dd} ${mon} ${yr} року`;
  console.log(formatted);
  return formatted;
}

function updateTime() {
  document.getElementById('time-display').textContent = getCurrentTime();
}

// Show time immediately on page load
updateTime();

// ── Task 2: "Guess the number" game ─────────────────────────
function formatDateTime(date) {
  const pad = n => String(n).padStart(2, '0');
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function getHint(diff) {
  if (diff > 15) return 'холодно';
  if (diff > 5)  return 'тепло';
  return 'гаряче';
}

function startGame() {
  do {
    playRound();
  } while (confirm('Зіграти ще раз?'));
}

function playRound() {
  const secret  = Math.floor(Math.random() * 51); // 0–50
  let attempts  = 0;

  while (true) {
    const input = prompt('Вгадайте число від 0 до 50:');
    if (input === null) return; // user cancelled

    const guess = parseInt(input);
    if (isNaN(guess) || guess < 0 || guess > 50) {
      alert('Введіть ціле число від 0 до 50!');
      continue;
    }

    attempts++;
    const diff = Math.abs(secret - guess);

    const logLine = `${formatDateTime(new Date())} Спроба ${attempts}: число ${guess} – не вірно`;

    if (guess === secret) {
      console.log(`${formatDateTime(new Date())} Спроба ${attempts}: число ${guess} – вірно!`);
      alert(`За ${attempts} ${pluralSproby(attempts)} ви вгадали число ${secret}`);
      return;
    }

    console.log(logLine);
    const hint = getHint(diff);
    alert(`Не вірно! Відхилення: ${diff}. ${hint.charAt(0).toUpperCase() + hint.slice(1)}.`);
  }
}

function pluralSproby(n) {
  if (n % 10 === 1 && n % 100 !== 11) return 'спробу';
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return 'спроби';
  return 'спроб';
}
