const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var userSchema = {
  nombre: String,
  email: String,
  mensaje : String
  //mensaje : [{type : Schema.ObjectId,ref : "mensaje"}],

};
var user = mongoose.model("user", userSchema);
module.exports = user;
