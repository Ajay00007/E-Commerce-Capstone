const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { setToken } = require("../utilities/jwtHelpers");
const { auth } = require("../utilities/routeAuth");

/**
 * Register new user
 * @route POST api/users
 */
router.post("/", async (req, res) => {
  const {
    name,
    email,
    password,
    street,
    city,
    province,
    postalCode,
  } = req.body;

  const checkUserExists = await User.findOne({ email });

  if (checkUserExists) {
    return res.status(400).json({ msg: "User alread exists." });
  }

  const newUser = new User({
    name,
    email,
    password,
    street,
    city,
    province,
    postalCode,
  });
  const userData = await newUser.save();

  if (!userData) {
    return res
      .status(500)
      .json({ msg: "There was an error creating the user." });
  }

  const token = setToken({ id: userData.id, role: userData.role });

  return res.status(200).json({
    token,
    user: userData,
    msg: "User registered successfully.",
  });
});

/**
 * Update existing user email
 * @route PUT api/users/update/email
 */
router.put("/update/email", auth, async (req, res) => {
  const { email } = req.body;

  const filter = { _id: req.user.id };
  const dataToUpdate = { email };
  const opts = { new: true, omitUndefined: true };

  try {
    const updatedUser = await User.findOneAndUpdate(filter, dataToUpdate, opts);

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Update existing user password
 * @route PUT api/users/update/password
 */
router.put("/update/password", auth, async (req, res) => {
  const { password } = req.body;

  const userWithPassword = await User.findById(req.user.id).select("+password");

  userWithPassword.password = password;

  try {
    await userWithPassword.save();

    return res.status(200).json({ msg: "Update was successful." });
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Update existing user address
 * @route PUT api/users/update/address
 */
router.put("/update/address", auth, async (req, res) => {
  const filter = { _id: req.user.id };
  const dataToUpdate = req.body;
  const opts = { new: true, omitUndefined: true };

  try {
    const updatedUser = await User.findOneAndUpdate(filter, dataToUpdate, opts);

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
