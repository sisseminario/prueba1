const mongoose = require("../connect");
var userSchema = {
  name : String,
  email: String,
  contraseña: String
};
var user = mongoose.model("user", userSchema);
module.exports = user;
