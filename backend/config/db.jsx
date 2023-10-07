require("colors");
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database ${conn.connection.host}`.bgYellow);
  } catch (error) {
    console.error(`Error in connection: ${error}`.bgRed);
  }
};

module.exports = { connectDb };
