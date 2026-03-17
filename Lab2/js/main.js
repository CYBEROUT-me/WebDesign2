// ============================================================
// Lab 2 – Color Toggle with removeEventListener pattern
// ============================================================

const toggleDivs = document.querySelectorAll('.toggle-div');

toggleDivs.forEach(div => {
  // Each div gets its own pair of named handler functions
  // so removeEventListener can correctly unregister them.

  function paintRed() {
    div.style.background = '#e74c3c';
    div.removeEventListener('click', paintRed);
    div.addEventListener('click', paintGreen);
  }

  function paintGreen() {
    div.style.background = '#2ecc71';
    div.removeEventListener('click', paintGreen);
    div.addEventListener('click', paintRed);
  }

  // Start in green state → first click should paint red
  div.addEventListener('click', paintRed);
});
