const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = process.env;

function authMiddleware(request, response, next) {
  //Get token and cut out "Bearer "
  const token = request.headers.authorization.split(" ")[1];

  if (!token) {
    return response
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (ex) {
    response.status(400).json({ message: "Invalid token." });
  }
}

module.exports = authMiddleware;
