const { User } = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");

const Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password,
      passwordHash: hashedPassword,
    });
    const response = await newUser.save();
    res.json({
      message: "User Created Successfully",
      status: 200,
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something wents wrong",
      data: error.message,
    });
  }
};
module.exports = Register;
