const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  confirm_password: {
    type: String,
    validate: {
      validator: function () {
        return this.confirm_password === this.password;
      },
      message: "Passwords must match",
    },
    select: false,
  },
  password_changed: Date,
  player: {
    type: mongoose.ObjectId,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  reset_token: String,
  reset_expiration: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirm_password = undefined;
  this.password_changed = new Date();
  next();
});

userSchema.methods.createResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.reset_token = hashedToken;
  this.reset_expiration = new Date(Date.now() + 10 * 60 * 1000);
  this.save();

  return resetToken;
};

userSchema.methods.comparePasswords = async function (plainText, hashPassword) {
  return await bcrypt.compare(plainText, hashPassword);
};

userSchema.methods.passwordChangedAfter = function (issueDate) {
  return Math.floor(this.password_changed.getTime() / 1000) > issueDate;
};

module.exports = mongoose.model("User", userSchema);
