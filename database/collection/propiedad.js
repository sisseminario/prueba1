const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var propiedadSchema = new Schema ({
  estado: String,
  descripcion: String,
  supterreno: Number,
  amurallado: String,
  servicios_basicos: String,
  otros: String,
  numero_banios: Number,
  nuemro_cocinas: Number,
  numero_habitaciones: Number,
  pisos: Number,
  elevador: String,
  piscina: String,
  garaje: String,
  amoblado: String,
  direccion: String,
  precio: String,
  moneda: String,
  tipo_vivienda: String,
  nombre_zona: String,
  nombre_ciudad: String,
  lat: String,
  lng: String,
  gallery: Array,
  nombre_dueno: String,
  apellido_dueno: String,
  telefono_dueno: Number,
  celular_dueno: Number,
  email_dueno: String
});
var propiedad= mongoose.model("propiedad",propiedadSchema );
module.exports = propiedad;
