const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var propiedadSchema = {
  estado: String,
  precio: Number,
  descripcion: String,
  fecha_entrega: Date,
  supterreno: Number,
  servicios_basicos: String,
  amurallado: Boolean,
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
  latitud: Number,
  longitud: Number,
  rating: Number//mensaje : [{type : Schema.ObjectId,ref : "mensaje"}],

};
var propiedad= mongoose.model("propiedad",propiedadSchema );
module.exports = propiedad;
