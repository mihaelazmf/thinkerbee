const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["child", "teacher", "parent"], // Include 'parent' in the enum values
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
