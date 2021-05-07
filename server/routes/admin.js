const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");
const { setToken } = require("../utilities/jwtHelpers");
const { authAdmin } = require("../utilities/routeAuth");

/**
 * Register new admin
 * @route POST api/admin
 */
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const checkUserExists = await Admin.findOne({ email });

  if (checkUserExists) {
    return res.status(400).json({ msg: "Admin alread exists." });
  }

  const newAdmin = new Admin({
    name,
    email,
    password,
  });
  const adminData = await newAdmin.save();

  if (!adminData) {
    return res
      .status(500)
      .json({ msg: "There was an error creating the user." });
  }

  const token = setToken({ id: adminData.id, role: adminData.role });

  return res.status(200).json({
    token,
    user: adminData,
    msg: "Admin registered successfully.",
  });
});

/**
 * Update existing admin email
 * @route PUT api/admin/update/email
 * Requires auth
 */
router.put("/update/email", authAdmin, async (req, res) => {
  const { email } = req.body;

  const filter = { _id: req.user.id };
  const dataToUpdate = { email };
  const opts = { new: true, omitUndefined: true };

  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      filter,
      dataToUpdate,
      opts
    );

    return res.status(200).json(updatedAdmin);
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Update existing admin password
 * @route PUT api/admin/update/password
 * Requires auth
 */
router.put("/update/password", authAdmin, async (req, res) => {
  const { password } = req.body;

  const adminWithPassword = await Admin.findById(req.user.id).select(
    "+password"
  );

  adminWithPassword.password = password;

  try {
    await adminWithPassword.save();

    return res.status(200).json({ msg: "Update was successful." });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
