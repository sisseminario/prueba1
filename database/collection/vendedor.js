const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var vendedorSchema = {
  nombre: String,
  apellido: String,
  telefono: Number,
  telefono_ref: Number,
  celular: Number,
  email: String,
  ciudad : String,
  password : String
  //mensaje : [{type : Schema.ObjectId,ref : "mensaje"}],

};
var vendedor  = mongoose.model("vendedor", vendedorSchema);
module.exports = vendedor;
