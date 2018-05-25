var express = require('express');
var router = express.Router();
var User = require("../../../database/collection/user");
var Propiedad = require("../../../database/collection/propiedad");
var Vendedor = require("../../../database/collection/vendedor");
var Ciudad = require("../../../database/collection/ciudad");
var Precio = require("../../../database/collection/precio");
var Zona = require("../../../database/collection/zona");
var Tipo = require("../../../database/collection/tipo");
var Oferta = require("../../../database/collection/oferta");
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

///leer usuariosr
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
//////////////////////////propiedad/////////////////////////////////
//insertar
router.post("/propiedad", (req, res) => {

  if (req.body.estado == "" && req.body.precio == "") {
    res.status(400).json({
      "msn" : "formato incorrecto de llenado"
    });
    return;
  }
  var propiedad = {
    estado: req.body.estado,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    fecha_entrega: req.body.fecha_entrega,
    supterreno: req.body.supterreno,
    amurallado: req.body.amurallado,
    servicios_basicos: req.body.servicios_basicos,
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
    direccion: req.body.direccion,
    ubicacion:req.body.ubicacion,
    rating: req.body.rating
  };
  var propiedadData =new Propiedad(propiedad);
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
///////////////////////////////////vendedor/////////////////////////////////////////////////
//insertar
router.post("/vendedor", (req, res) => {

  if (req.body.nombre == "" && req.body.apellido== "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var vendedor = {
    nombre : req.body.nombre,
    apellido: req.body.apellido,
    telefono: req.body.telefono,
    telefono_ref: req.body.telefono_ref,
    celular: req.body.celular,
    email: req.body.email,
    ciudad : req.body.ciudad

  };
  var vendedorData = new Vendedor(vendedor);

  vendedorData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "vendedor Registrado con exito "
    });
  });
});
//leer Vendedor
router.get("/vendedor", (req, res, next) => {
  Vendedor.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
/////////////////////////////////ciudad///////////////////////////////////////
//insertar
router.post("/ciudad", (req, res) => {

  if (req.body.nombre_ciudad == "" ) {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var ciudad = {
    nombre_ciudad : req.body.nombre_ciudad,
    latitud:req.body.latitud,
    longitud: req.body.longitud

  };
  var ciudadData = new Ciudad(ciudad);

  ciudadData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "ciudad Registrado con exito "
    });
  });
});
//leer Vendedor
router.get("/ciudad", (req, res, next) => {
  Ciudad.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
///////////////////////////////precio/////////////////////////////////////
router.post("/precio", (req, res) => {

  if (req.body.precio == "" ) {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var precio = {
    precio: req.body.precio,
    presiolso: req.body.presiolso,
    moneda: req.body.moneda,
    monedalso: req.body.monedalso

  };
  var precioData = new Precio(precio);

  precioData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "precio Registrado con exito "
    });
  });
});

///leer
router.get("/precio", (req, res, next) => {
 Precio.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
/////////////////////////////////////zona///////////////////////////////////
router.post("/zona", (req, res) => {

  if (req.body.nombre_zona == "" ) {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var zona = {
    nombre_zona: req.body.nombre_zona,

  };
  var zonaData = new Zona(zona);

  zonaData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "zona Registrado con exito "
    });
  });
});

///leer
router.get("/zona", (req, res, next) => {
  Zona.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
/////////////////////////////////////tipo////////////////////////
router.post("/tipo", (req, res) => {

  if (req.body.tipo_vivienda == "" ) {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var tipo = {
    tipo_vivienda: req.body.tipo_vivienda,

  };
  var tipoData = new Tipo(tipo);

  tipoData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "tipo Registrado con exito "
    });
  });
});

///leer
router.get("/tipo", (req, res, next) => {
  Tipo.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
//////////////////////////////////oferta///////////////
router.post("/oferta", (req, res) => {

  if (req.body.tipo_vivienda == "" ) {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var oferta = {
    tipo_oferta: req.body.tipo_oferta,

  };
  var ofertaData = new Oferta(oferta);

  ofertaData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "oferta Registrado con exito "
    });
  });
});

///leer
router.get("/oferta", (req, res, next) => {
  Oferta.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
