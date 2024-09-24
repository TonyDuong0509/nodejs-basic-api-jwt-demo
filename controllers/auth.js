const User = require("./../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("./../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new BadRequestError("Fields can not be empty");
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({
    user: { name: user.name, email: user.email },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Email or password can't be empty");
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid Credentials");
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid Credentials");
  const token = user.generateToken();
  res.status(StatusCodes.OK).json({
    user: { name: user.name },
    token,
  });
};

module.exports = { register, login };
