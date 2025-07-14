const express = require('express');
const router = express.Router();
const db = require('../db');

// Health check
router.get('/health', (req, res) => {
  res.send({ status: 'Game Service is running' });
});

// Add a game
router.post('/games', (req, res) => {
  const { name, category, release_date, price } = req.body;
  const sql = 'INSERT INTO games (name, category, release_date, price) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, category, release_date, price], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Game added', id: result.insertId });
  });
});

// Get all games
router.get('/games', (req, res) => {
  db.query('SELECT * FROM games', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

module.exports = router;
