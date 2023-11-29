const mongoose = require("mongoose");
const validator = require("validator"); //Validate the email and other things
const userRoles = require("../utils/userRoles");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Field must be a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
    default: userRoles.USER,
  },
  avatar: {
    type: String,
    default: "uploads/profile.png",
  },
});

module.exports = mongoose.model("User", userSchema);
