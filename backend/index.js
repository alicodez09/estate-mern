const express = require("express");
require("dotenv").config();
const { connectDb } = require("./config/db.jsx");
const authRouter = require("./routes/auth.route.js");

require("colors");
const app = express();

// Configure Database
connectDb();

const PORT = process.env.PORT;

app.use(express.json());
// Routes
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is listning on port ${PORT}`.bgWhite);
});
