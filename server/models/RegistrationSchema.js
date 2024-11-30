const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  userName: {
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

});

module.exports = mongoose.model("UserRegistration", RegistrationSchema);