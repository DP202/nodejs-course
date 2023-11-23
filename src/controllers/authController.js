const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const isExistedEmail = await User.findOne({ email });
  if (isExistedEmail) {
    // nếu email tồn tại
    return res.status(400).json({
      success: false,
      message: "Email is already Existed",
    });
  }
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);
  // Nếu email chưa tồn tại thì tiến hành đăng kí

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(201).json({
    success: true,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); // tìm thấy hoặc không tìm thấy email
  if (!user) {
    return res.status(409).json({
      success: false,
      message: "Unauthorized",
    });
  }
  const isMatch = bcrypt.compareSync(password, user.password); // so sánh password nhập vào với password có săn
  if (!isMatch) {
    // nếu password sai :
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  // Nếu email và password nó trùng nhau hết thì :
  //jwt  => Json Web Token
  // Tạo jwt
  const token = jwt.sign(
    {
      // payload => là database
      user: user.username,
      id: user._id,
      email: user.email,
    },
    env.SECRET_KEY,
    {
      expiresIn: env.EXPIRED_IN,
    }
  );
  res.json({
    success: true,
    token,
  });
};

module.exports = {
  register,
  login,
};
