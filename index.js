const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

const isInvalidType = (num1, num2) => {
  return typeof num1 !== 'number' || typeof num2 !== 'number';
};

const checkLimits = (num1, num2, result) => {
  const MAX = 1000000;
  const MIN = -1000000;
  if (num1 > MAX || num2 > MAX || result > MAX) return 'Overflow';
  if (num1 < MIN || num2 < MIN || result < MIN) return 'Underflow';
  return null;
};

app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  if (isInvalidType(num1, num2)) {
    return res.status(400).json({ status: 'error', message: 'Invalid data types' });
  }

  const sum = num1 + num2;
  const limitError = checkLimits(num1, num2, sum);
  if (limitError) {
    return res.status(400).json({ status: 'error', message: limitError });
  }

  res.json({
    status: 'success',
    message: 'the sum of given two numbers',
    sum,
  });
});

app.post('/sub', (req, res) => {
  const { num1, num2 } = req.body;
  if (isInvalidType(num1, num2)) {
    return res.status(400).json({ status: 'error', message: 'Invalid data types' });
  }

  const difference = num1 - num2;
  const limitError = checkLimits(num1, num2, difference);
  if (limitError) {
    return res.status(400).json({ status: 'error', message: limitError });
  }

  res.json({
    status: 'success',
    message: 'the difference of given two numbers',
    difference,
  });
});

app.post('/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  if (isInvalidType(num1, num2)) {
    return res.status(400).json({ status: 'error', message: 'Invalid data types' });
  }

  const result = num1 * num2;
  const limitError = checkLimits(num1, num2, result);
  if (limitError) {
    return res.status(400).json({ status: 'error', message: limitError });
  }

  res.json({
    status: 'success',
    message: 'The product of given numbers',
    result,
  });
});

app.post('/divide', (req, res) => {
  const { num1, num2 } = req.body;
  if (isInvalidType(num1, num2)) {
    return res.status(400).json({ status: 'error', message: 'Invalid data types' });
  }

  if (num2 === 0) {
    return res.status(400).json({ status: 'error', message: 'Cannot divide by zero' });
  }

  const result = num1 / num2;
  const limitError = checkLimits(num1, num2, result);
  if (limitError) {
    return res.status(400).json({ status: 'error', message: limitError });
  }

  res.json({
    status: 'success',
    message: 'The division of given numbers',
    result,
  });
});

module.exports = app;
