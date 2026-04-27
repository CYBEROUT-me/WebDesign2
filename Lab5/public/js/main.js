// ============================================================
// Lab 5 – AJAX frontend
// ============================================================

document.getElementById('calcBtn').addEventListener('click', calculate);
document.getElementById('numberInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') calculate();
});

function calculate() {
  const input     = document.getElementById('numberInput');
  const resultDiv = document.getElementById('result');
  const errorDiv  = document.getElementById('error');
  const value     = input.value.trim();

  resultDiv.classList.add('hidden');
  errorDiv.classList.add('hidden');

  if (value === '') {
    showError('Введіть число!');
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/square', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;

    const data = JSON.parse(xhr.responseText);

    if (xhr.status === 200) {
      resultDiv.textContent = `${data.number}² = ${data.square}`;
      resultDiv.classList.remove('hidden');
    } else {
      showError(data.error || 'Помилка сервера');
    }
  };

  xhr.send(JSON.stringify({ number: value }));
}

function showError(msg) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = msg;
  errorDiv.classList.remove('hidden');
}
