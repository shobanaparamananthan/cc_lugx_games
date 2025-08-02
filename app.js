const express = require('express');
const app = express();
const gamesRouter = require('./routes/games');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(express.json());
app.use('/', gamesRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Game Service running on port ${PORT}`));

