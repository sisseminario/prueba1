const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var tipoSchema = {
  tipo_vivienda: String,
  //mensaje : [{type : Schema.ObjectId,ref : "mensaje"}],
};
var tipo = mongoose.model("tipo", tipoSchema);
module.exports = tipo;
