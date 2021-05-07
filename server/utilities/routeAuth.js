const { verifyToken } = require("./jwtHelpers");
const Roles = require("./Roles");

/**
 * A middleware function to verify token access to routes
 * @param {object}   req    Request object
 * @param {object}   res    Response object
 * @param {function} next   Next middleware function
 */
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Not authorized." });
  }

  const verifiedId = verifyToken(token);
  if (!verifiedId) {
    return res.status(400).json({ msg: "Invalid token." });
  }

  req.user = verifiedId;
  next();
}

/**
 * A middleware function to verify Admin token access to routes
 * @param {object}   req    Request object
 * @param {object}   res    Response object
 * @param {function} next   Next middleware function
 */
function authAdmin(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Not authorized." });
  }

  const verifiedId = verifyToken(token);

  if (!verifiedId || verifiedId.role !== Roles.Admin) {
    return res.status(401).json({ msg: "Invalid token." });
  }

  req.user = verifiedId;
  next();
}

module.exports = { auth, authAdmin };
