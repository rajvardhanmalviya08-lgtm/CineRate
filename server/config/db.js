const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cinerate', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    console.warn(`[Database Warning] Please ensure MongoDB is running locally (e.g. 'mongod' or MongoDB Service) or provide a valid MongoDB Atlas connection string in server/.env (MONGO_URI).`);
    // Do not crash server so endpoints that don't need DB or TMDB proxy can still run
  }
};

module.exports = connectDB;

