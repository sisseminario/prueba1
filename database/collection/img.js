const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var imgSchema = new Schema({
  nombre : String,
  idpropiedad: String,
  physicalpath : String,
  relativepath : String
});
var img = mongoose.model("img", imgSchema);
module.exports = img;
