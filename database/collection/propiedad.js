const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
//var Dueño = mongoose.model('Dueño');
var propiedadSchema = {
  estado: String,
//  precio: Number,
  descripcion: String,
  fecha_entrega: { type: Date, default: Date.now },
  supterreno: String,
  amurallado: Boolean,
  servicios_basicos: String,
  anio_construccion: Date,
  deshabitacion: String,
  descripcion_banio: String,
  numero_banios: Number,
  numero_habitacines: Number,
  supconstruida: Number,
  supterraza: Number,
  pisos: Number,
  elevador: Boolean,
  baulera: Boolean,
  piscina: Boolean,
  garaje: Boolean,
  numparqueos: Number,
  amoblado: Boolean,
  fecha_publicacion: Date,
  ubicacion: String,
  dieccion: String,
  rating: Number
  //dueño : { type: Schema.ObjectId, ref: "dueño" }
};
var propiedad= mongoose.model("propiedad",propiedadSchema );
module.exports = propiedad;
