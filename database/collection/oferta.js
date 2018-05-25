const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var ofertaSchema = {
  tipo_oferta: String,
  //mensaje : [{type : Schema.ObjectId,ref : "mensaje"}],
};
var oferta = mongoose.model("oferta", ofertaSchema);
module.exports = oferta;
