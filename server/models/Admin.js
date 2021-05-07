const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const Roles = require("../utilities/Roles");

const SALT_FACTOR = 10;

const adminSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: Roles.Admin },
});

adminSchema.pre("save", function (next) {
  const admin = this;

  if (!admin.isModified("password")) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(admin.password, salt, (err, hash) => {
      if (err) return next(err);

      admin.password = hash;
      next();
    });
  });
});

adminSchema.methods.comparePassword = async function (canidatePassword) {
  return await bcrypt.compare(canidatePassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
