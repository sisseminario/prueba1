const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var dueñoSchema = {
  nombre: String,
  email: String,
  telefono: Number,
  celular: Number
  //mensaje : [{type : Schema.ObjectId,ref : "mensaje"}],

};
var dueño = mongoose.model("Dueño", dueñoSchema);
module.exports = dueño;
