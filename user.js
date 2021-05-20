const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  userType: {
    type: String,
    enum: ["rider", "driver"],
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("UserSchema", userSchema);
