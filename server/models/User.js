const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const Roles = require("../utilities/Roles");

const SALT_FACTOR = 10;

const userSchema = Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, default: Roles.User },
  purchases: [{ type: Schema.Types.ObjectId, ref: "Purchase" }],
});

function handleHashPassword(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
}

userSchema.pre("save", handleHashPassword);

userSchema.methods.comparePassword = async function (canidatePassword) {
  return await bcrypt.compare(canidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
