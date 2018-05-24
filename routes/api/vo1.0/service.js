
var express = require('express');
var router = express.Router();
var User = require("../../../database/collection/user");
var Propiedad = require("../../../database/collection/propiedad");
///var Mensaje = require("../../../database/collection/mensaje");
////crear usuario
router.post("/user", (req, res) => {

  if (req.body.nombre == "" && req.body.email == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var user = {
    nombre : req.body.nombre,
    email: req.body.email,
    mensaje: req.body.mensaje

  };
  var userData = new User(user);

  userData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "usuario Registrado con exito "
    });
  });
});

///leer usuario
router.get("/user", (req, res, next) => {
  User.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
//leer uno por uno los usuarios
router.get(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});
//eliminar usuarios
router.delete(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});
///insertar propiedad
router.post("/propiedad", (req, res) => {

  if (req.body.estado == "" && req.body.precio == "") {
    res.status(400).json({
      "msn" : "formato incorrecto de llenado"
    });
    return;
  }
  var user = {
    estado: req.body.estado,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    fecha_entrega: req.body.fecha_entrega,
    supterreno: req.body.supterreno,
    servicios_basicos: req.body.servicios_basicos,
    amurallado: req.body.amurallado,
    anio_construccion: req.body.anio_construccion,
    deshabitacion: req.body.deshabitacion,
    descripcion_banio: req.body.descripcion_banio,
    numero_banios: req.body.numero_banios,
    numero_habitacines: req.body.numero_habitacines,
    supconstruida: req.body.supconstruida,
    supterraza: req.body.supterraza,
    pisos: req.body.pisos,
    elevador: req.body.elevador,
    baulera: req.body.baulera,
    piscina: req.body.piscina,
    garaje: req.body.garaje,
    numparqueos: req.body.numparqueos,
    amoblado:req.body.amoblado,
    fecha_publicacion: req.body.fecha_publicacion,
    latitud:req.body.latitud,
    longitud: req.body.longitud,
    rating: req.body.rating


  };
  var propiedadData=new Propiedad(propiedad);

  propiedadData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "propiedad  Registrado con exito "
    });
  });
});
//leer propiedad
router.get("/propiedad", (req, res, next) => {
  Propiedad.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
