const express = require("express");
require("dotenv").config();
const { connectDb } = require("./config/db.jsx");
const authRouter = require("./routes/auth.route.js");
const cors = require("cors");
require("colors");
const app = express();

// Configure Database
connectDb();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
// Routes
app.use("/api/v1", authRouter);

app.listen(PORT, () => {
  console.log(`Server is listning on port ${PORT}`.bgWhite);
});
