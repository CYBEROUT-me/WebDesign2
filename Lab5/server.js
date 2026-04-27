// ============================================================
// Lab 5 – AJAX | Express server
// Run: npm install && node server.js
// Open: http://localhost:3000
// ============================================================

const express = require('express');
const path    = require('path');

const app  = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// POST /square – receives { number }, returns { number, square }
app.post('/square', (req, res) => {
  const num = parseFloat(req.body.number);
  if (isNaN(num)) {
    return res.status(400).json({ error: 'Введіть коректне число' });
  }
  res.json({ number: num, square: num * num });
});

app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
});
