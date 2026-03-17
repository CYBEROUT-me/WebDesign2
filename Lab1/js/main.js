// ============================================================
// Lab 1 – DOM Events & Event Handlers
// ============================================================

// ── Task 1.1 – Image click handler (logs width attribute) ──
const images = document.querySelectorAll('.img-row img');

images.forEach(img => {
  img.onclick = function () {
    console.log(`Image "${this.alt}" width attribute: ${this.getAttribute('width')}px`);
  };
});


// ── Task 1.2 – Link hover (sets title to href) ──
const hoverLinks = document.querySelectorAll('.hover-link');

function onLinkEnter(e) {
  e.target.setAttribute('title', e.target.getAttribute('href'));
}

function onLinkLeave(e) {
  // Keep title after hover; remove listener to prevent repeated re-sets
  e.target.removeEventListener('mouseleave', onLinkLeave);
}

hoverLinks.forEach(link => {
  link.addEventListener('mouseenter', onLinkEnter);
  link.addEventListener('mouseleave', onLinkLeave);
});


// ── Task 1.3 – Input click displays value in #demo ──
const demoInputs = document.querySelectorAll('.demo-input');
const demoP = document.getElementById('demo');

demoInputs.forEach(input => {
  input.addEventListener('click', function () {
    demoP.textContent = this.value;
  });
});


// ── Task 1.4 – First click → console, subsequent clicks → alert ──
const smartInputs = document.querySelectorAll('.smart-input');

smartInputs.forEach(input => {
  // Flag: tracks whether this input has been clicked before
  let firstClick = true;

  function handleFirstClick() {
    console.log(`First click — value: "${input.value}"`);
    firstClick = false;
    // Remove first-click handler, add repeat handler
    input.removeEventListener('click', handleFirstClick);
    input.addEventListener('click', handleRepeatClick);
  }

  function handleRepeatClick() {
    alert(`Repeat click — value: "${input.value}"`);
  }

  input.addEventListener('click', handleFirstClick);
});


// ── Task 1.5 – Number square calculator ──
const wordToNumber = {
  five: 5,
  ten: 10,
  twenty: 20,
};

const numberWords = document.querySelectorAll('.number-word');

numberWords.forEach(p => {
  p.addEventListener('click', function () {
    const word = this.textContent.trim().toLowerCase();
    const num = wordToNumber[word];

    if (num !== undefined) {
      this.textContent = num * num;
      this.style.background = '#27ae60'; // visual feedback: green after computing
    }
  });
});
