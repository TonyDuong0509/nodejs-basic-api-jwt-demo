const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("./../errors");

const authMiddleware = async (req, res, next) => {
  // Check headers
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new UnauthenticatedError("Authentication invalid");
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  next();
};

module.exports = { authMiddleware };
