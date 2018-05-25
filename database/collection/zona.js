const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var zonaSchema = {
  nombre_zona: String,
  //mensaje : [{type : Schema.ObjectId,ref : "mensaje"}],
};
var zona = mongoose.model("zona", zonaSchema);
module.exports = zona;
