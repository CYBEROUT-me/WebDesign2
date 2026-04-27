// ============================================================
// Lab 6 – Objects in JavaScript
// ============================================================

// ── Task 1: Language & Day Selector ─────────────────────────
const daysData = {
  ua: {
    langPrompt: 'Виберіть мову "ua" або "en"?',
    dayPrompt:  'Введіть номер дня неділі від 1 до 7?',
    wrongLang:  'Неправильний ввід! Введіть "ua" або "en"',
    wrongDay:   'Неправильний ввід! Введіть число від 1 до 7',
    days: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'],
  },
  en: {
    langPrompt: 'Choose language "ua" or "en"?',
    dayPrompt:  'Enter the day number of the week (from 1 to 7)?',
    wrongLang:  'Invalid input! Enter "ua" or "en"',
    wrongDay:   'Invalid input! Enter a number from 1 to 7',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
};

function runTask1() {
  let lang;
  while (true) {
    const input = prompt('Виберіть мову "ua" або "en"?');
    if (input === null) return;
    lang = input.trim().toLowerCase();
    if (lang === 'ua' || lang === 'en') break;
    alert('Неправильний ввід! Введіть "ua" або "en"');
  }

  const data = daysData[lang];

  let dayNum;
  while (true) {
    const input = prompt(data.dayPrompt);
    if (input === null) return;
    dayNum = parseInt(input);
    if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 7) break;
    alert(data.wrongDay);
  }

  alert(data.days[dayNum - 1]);
}

// ── Task 2: Electric Network OOP ────────────────────────────

class PowerPlant {
  constructor(name, power) {
    this.name  = name;
    this.power = power; // MW
  }
  getProduction() { return this.power; }
  getType() { return 'Електростанція'; }
}

class SolarPanel {
  constructor(name, dayPower) {
    this.name     = name;
    this.dayPower = dayPower; // MW (day); 0 at night
  }
  getProduction(isDay) { return isDay ? this.dayPower : 0; }
  getType() { return 'Сонячна панель'; }
}

class ResidentialBuilding {
  constructor(name, apartments) {
    this.name       = name;
    this.apartments = apartments;
  }
  // 4 kW/apt day → 0.004 MW; 1 kW/apt night → 0.001 MW
  getConsumption(isDay) {
    return this.apartments * (isDay ? 0.004 : 0.001);
  }
  getType() { return 'Житловий будинок'; }
}

class PowerLine {
  constructor(name, capacity, pricePerMW) {
    this.name       = name;
    this.capacity   = capacity;   // MW max transfer
    this.pricePerMW = pricePerMW; // UAH per MW
  }
  getType() { return 'Лінія ЕП'; }
}

class PowerGrid {
  constructor(elements) {
    this.elements = elements;
  }

  calculate(isDay) {
    let production  = 0;
    let consumption = 0;
    const lines     = [];

    for (const el of this.elements) {
      if (el instanceof PowerPlant)          production  += el.getProduction();
      else if (el instanceof SolarPanel)     production  += el.getProduction(isDay);
      else if (el instanceof ResidentialBuilding) consumption += el.getConsumption(isDay);
      else if (el instanceof PowerLine)      lines.push(el);
    }

    const balance = production - consumption;
    let financialResult = 0;
    let action;

    if (balance < 0) {
      // Need to buy – use cheapest lines first
      const sorted = [...lines].sort((a, b) => a.pricePerMW - b.pricePerMW);
      let needed = Math.abs(balance);
      for (const line of sorted) {
        const amount = Math.min(needed, line.capacity);
        financialResult -= amount * line.pricePerMW;
        needed -= amount;
        if (needed <= 0) break;
      }
      action = `Закупити ${Math.abs(balance).toFixed(3)} МВт`;
    } else if (balance > 0) {
      // Surplus – sell via most expensive lines first
      const sorted = [...lines].sort((a, b) => b.pricePerMW - a.pricePerMW);
      let surplus = balance;
      for (const line of sorted) {
        const amount = Math.min(surplus, line.capacity);
        financialResult += amount * line.pricePerMW;
        surplus -= amount;
        if (surplus <= 0) break;
      }
      action = `Продати ${balance.toFixed(3)} МВт`;
    } else {
      action = 'Баланс';
    }

    return { production, consumption, balance, action, financialResult };
  }
}

// ── Sample grid ──────────────────────────────────────────────
const grid = new PowerGrid([
  new PowerPlant('ТЕС "Дніпро"', 5),
  new SolarPanel('Сонячна ферма "Схід"', 3),
  new SolarPanel('Сонячна ферма "Захід"', 2),
  new ResidentialBuilding('Квартал А', 400),
  new ResidentialBuilding('Квартал Б', 300),
  new ResidentialBuilding('Квартал В', 250),
  new PowerLine('Лінія до Києва', 3, 50),
  new PowerLine('Лінія до Харкова', 2, 45),
]);

function runTask2() {
  const output = document.getElementById('grid-output');
  output.innerHTML = '';
  output.classList.remove('hidden');

  function row(text, cls = '') {
    const div = document.createElement('div');
    div.className = 'row' + (cls ? ' ' + cls : '');
    div.textContent = text;
    output.appendChild(div);
  }

  function title(text) {
    const div = document.createElement('div');
    div.className = 'section-title';
    div.textContent = text;
    output.appendChild(div);
  }

  // Elements list
  title('Елементи мережі');
  grid.elements.forEach(el => {
    if (el instanceof PowerPlant)
      row(`⚡ ${el.getType()}: ${el.name} — ${el.power} МВт`, 'ok');
    else if (el instanceof SolarPanel)
      row(`☀️  ${el.getType()}: ${el.name} — ${el.dayPower} МВт вдень / 0 вночі`, 'warn');
    else if (el instanceof ResidentialBuilding)
      row(`🏠 ${el.getType()}: ${el.name} — ${el.apartments} квартир`, 'info');
    else if (el instanceof PowerLine)
      row(`🔌 ${el.getType()}: ${el.name} — потужність ${el.capacity} МВт, ціна ${el.pricePerMW} грн/МВт`, '');
  });

  // Day / Night calculation
  ['День', 'Ніч'].forEach((label, idx) => {
    const isDay = idx === 0;
    const r = grid.calculate(isDay);

    title(`${label}: розрахунок`);
    row(`Виробництво:    ${r.production.toFixed(3)} МВт`, 'ok');
    row(`Споживання:     ${r.consumption.toFixed(3)} МВт`, 'bad');
    row(`Баланс:         ${r.balance.toFixed(3)} МВт`);
    row(`Дія:            ${r.action}`);

    const sign = r.financialResult >= 0 ? '+' : '';
    const cls  = r.financialResult >= 0 ? 'ok' : 'bad';
    row(`Фінансовий результат: ${sign}${r.financialResult.toFixed(2)} грн`, cls);
  });
}
