const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    default: "Fblthp_1",
  },
  roles: {
    type: [String], // example: "User", "Admin", "Super Admin"
    required: true,
    default: ["User"],
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;