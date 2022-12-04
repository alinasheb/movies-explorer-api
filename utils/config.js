require('dotenv').config();

const { PORT = 3000, JWT_SECRET = 'c8ba1902c824d44c5cd298742ee64927748b458c31ee46886377c8c1b5bba8eb', DATABASE_URL = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;

// const DATABASE_URL = 'mongodb://127.0.0.1:27017/moviesdb';
const JWT_STORAGE_TIME = '7d';
const SALT_LENGTH = 10;

module.exports = {
  PORT,
  JWT_SECRET,
  DATABASE_URL,
  SALT_LENGTH,
  JWT_STORAGE_TIME,
};
