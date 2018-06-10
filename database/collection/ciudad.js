const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var ciudadSchema = {
  nombre_ciudad: String,
  latitud: String,
  longitud: String


};
var  ciudad = mongoose.model("ciudad",  ciudadSchema);
module.exports =  ciudad;
