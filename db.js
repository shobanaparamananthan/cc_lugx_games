const mysql = require('mysql2');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
  port: process.env.DB_PORT || 3306,
};

let connection;

const connectWithRetry = async () => {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    try {
      connection = mysql.createConnection(config);

      await new Promise((resolve, reject) => {
        connection.connect((err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      console.log("✅ Connected to MySQL!");
      break;
    } catch (err) {
      console.error(`❌ MySQL not ready (attempt ${attempts + 1}/${maxAttempts}): ${err.message}`);
      attempts++;
      await sleep(3000);
    }
  }

  if (attempts === maxAttempts) {
    console.error("❌ Could not connect to MySQL after maximum retries.");
    process.exit(1);
  }
};

connectWithRetry();

module.exports = () => connection;
