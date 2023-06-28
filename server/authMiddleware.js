const jwt = require("jsonwebtoken");

function authMiddleware(request, response, next) {
  //Get token and cut out "Bearer "
  const token = request.headers["authorization"];
  console.log("token" + token);

  if (!token) {
    return response
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "yourSecretKey");
    console.log("decoded: " + decoded);
    request.user = decoded;
    next();
  } catch (ex) {
    response.status(400).json({ message: "Invalid token." });
  }
}

module.exports = authMiddleware;
