const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

/**
 * Sets a JSON web token based on the user ID
 * @param {*} payload A public key for signing, typically the User ID
 * @param {*} options Optional parameters for signing; sets expiry to 3600s
 */
function setToken(payload, options = { expiresIn: 3600 }) {
  const token = jwt.sign(payload, jwtSecret, options);
  if (!token) {
    return console.error("Token error.");
  }

  return token;
}

/**
 * Verifies the signature of a JSON web token
 * @param {*} inputToken  Token to comapre
 * @param {*} jwtSecret   The secret key for the project
 */
function verifyToken(inputToken, secret = jwtSecret) {
  try {
    const decoded = jwt.verify(inputToken, secret);
    return decoded;
  } catch (error) {
    return error;
  }
}

module.exports = { setToken, verifyToken };
