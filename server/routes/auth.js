const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Admin = require("../models/Admin");
const { setToken } = require("../utilities/jwtHelpers");
const { auth, authAdmin } = require("../utilities/routeAuth");
const Roles = require("../utilities/Roles");

/**
 * Login a user
 * @route POST api/auth/user
 */
router.post("/user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ msg: "Invalid credentials." });
  }

  const token = setToken({ id: user.id, role: user.role });

  return res.status(200).json({
    token,
    user: {
      role: user.role,
      id: user.id,
      email: user.email,
      name: user.name,
      street: user.street,
      city: user.city,
      province: user.province,
      postalCode: user.postalCode,
    },
  });
});

/**
 * Login an admin
 * @route POST api/auth/admin
 */
router.post("/admin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ msg: "User not found" });

  const isPasswordValid = await admin.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ msg: "Invalid credentials." });
  }

  const token = setToken({ id: admin.id, role: admin.role });

  return res.status(200).json({
    token,
    user: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  });
});

/**
 * Verify a logged in user by token via `auth` middleware
 * @route GET api/auth/user
 */
router.get("/user", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({ msg: "Could not verify user." });
  }
  return res.status(200).json(user);
});

/**
 * Verify a logged in admin by token via `authAdmin` middleware
 * @route GET api/auth/admin
 */
router.get("/admin", authAdmin, async (req, res) => {
  const admin = await Admin.findById(req.user.id);
  if (!admin) {
    return res.status(401).json({ msg: "Could not verify user." });
  }
  return res.status(200).json(admin);
});

module.exports = router;
