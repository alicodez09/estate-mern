const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    passwordHash: {
      type: String,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = { User };
