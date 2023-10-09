const { User } = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const Login = async (req, res) => {
  const { email, passwordHash } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return res.status(401).json({
        message: "Invalid User",
      });
    }

    const validPassword = bcryptjs.compareSync(
      passwordHash,
      validUser.passwordHash
    );
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
    console.log(validUser._doc);
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { passwordHash: userPass, password, ...user } = validUser._doc; //This will not show senstive information of validUser like password and hashed password from the document
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      message: "Login Successfully",
      status: 200,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

module.exports = { Register, Login };
