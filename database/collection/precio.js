const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var precioSchema = {
  precio: String,
  presiolso: Number,
  moneda: String,
  monedalso: String
  //mensaje : [{type : Schema.ObjectId,ref : "mensaje"}],

};
var precio = mongoose.model("precio", precioSchema);
module.exports = precio;
