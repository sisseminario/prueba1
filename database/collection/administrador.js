const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var administradorSchema = {
  nombre: String,
  email: String,
  password: String
};
var administrador = mongoose.model("administrador", administradorSchema);
module.exports = administrador;
