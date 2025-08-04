const express = require('express');
const app = express();
const gamesRouter = require('./routes/games');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(express.json());
app.use('/', gamesRouter);

// Export app for testing
module.exports = app;

// Only listen when run directly
if (require.main === module) {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Game Service running on port ${PORT}`));
}
