const express = require('express');
const router = express.Router();
const db = require('../db');

// Automatically create the `games` table if it doesn't exist
const createGamesTable = `
  CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    release_date DATE,
    price DECIMAL(10,2)
  )
`;

db.query(createGamesTable, (err) => {
  if (err) {
    console.error(" Failed to create games table:", err.message);
  } else {
    console.log(" Games table is ready or already exists.");
  }
});

// Health check
router.get('/health', (req, res) => {
  res.send({ status: 'Game Service is running' });
});

// Create a game
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
