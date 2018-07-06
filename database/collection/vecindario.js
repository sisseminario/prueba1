const mongoose = require("../connect");
var vecindarioSchema = {
	departamento: String,
	nombre: String,
	zoom: Number,
	lat: Number,
	lng: Number,
	coordenadas:Array
};
var vecindario = mongoose.model("vecindario", vecindarioSchema);
module.exports = vecindario;
