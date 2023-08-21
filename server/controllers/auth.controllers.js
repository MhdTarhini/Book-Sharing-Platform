const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const login = async (req, res) => {
  const { email: login, password } = req.body;
  const user = await User.findOne({ email: login });

  if (!user) {
    return res.status(404).send({ message: "email/password incorrect" });
  }

  const isValid = bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(404).send({ message: "email/password incorrect" });
  }

  const { password: hashedPassword, ...userInfo } = user.toJSON();

  const token = jwt.sign(
    {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      _id: userInfo._id,
    },
    process.env.JWT_SECRET
  );

  res.send({
    token,
    user: userInfo,
  });
};

const register = async (req, res) => {
  const { password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    ...req.body,
    password: hashedPassword,
  });

  await user.save();

  res.send(user);
};

const verify = (_, res) => {
  res.send("Verfied");
};
const logout = (_, res) => {
  res.send("logout");
};

module.exports = { login, register, verify, logout };
