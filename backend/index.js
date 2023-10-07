const express = require("express");
require("dotenv").config();
const { connectDb } = require("./config/db.jsx");
require("colors");
const app = express();

// Configure Database
connectDb();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listning on port ${PORT}`.bgWhite);
});
