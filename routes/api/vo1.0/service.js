var express = require('express');
var multer = require('multer');
var router = express.Router();
var _ = require("underscore");
var User = require("../../../database/collection/user");
var Propiedad = require("../../../database/collection/propiedad");
var Vendedor = require("../../../database/collection/vendedor");
var Ciudad = require("../../../database/collection/ciudad");
var Precio = require("../../../database/collection/precio");
var Zona = require("../../../database/collection/zona");
var Tipo = require("../../../database/collection/tipo");
var Oferta = require("../../../database/collection/oferta");

var Img = require("../../../database/collection/img");

var storage = multer.diskStorage({
  destination: "./public/avatars",
  filename: function (req, file, cb) {
    console.log("-------------------------");
    console.log(file);
    cb(null, file.originalname + "-" + Date.now() + ".jpg");
  }
});
var upload = multer({
  storage: storage
}).single("img");;

//////crear userimg
router.post("/userimg", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({
        "msn" : "No se ha podido subir la imagen"
      });
    } else {
      var ruta = req.file.path.substr(6, req.file.path.length);
      console.log(ruta);
      var img = {
        name : req.file.originalname,
        physicalpath: req.file.path,
        relativepath: "http://localhost:7777" + ruta
      };
      var imgData = new Img(img);
      imgData.save().then( () => {
        //content-type
        res.status(200).json(
          req.file
        );
      });
    }
  });
});

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

////PACH actualizacion solo de alguno de los datos del usuario

router.patch(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var user = {};
  for (var i = 0; i < keys.length; i++){
    user[keys[i]] = req.body[keys[i]];
  }
  console.log(user);
  User.findOneAndUpdate({_id: id}, user, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
});


/// implementacion del Metodo PUT para actualizar
router.put(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var oficialkes = ['nombre', 'email', 'mensaje'];
  var result = _.difference(oficialkes, keys);
  if (result.length > 0){
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hhaces uso del metodo patch si desea editar solo un fragmento de la informacion"
    });
    return;
  }
  var user = {
    nombre : req.body.nombre,
    email: req.body.email,
    mensaje: req.body.mensaje
  };
  User.findOneAndUpdate({_id: id}, user, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
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

//leer uno por uno las propiedades
router.get(/propiedad\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Propiedad.findOne({_id : id}).exec( (error, docs) => {
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
router.delete(/propiedad\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Propiedad.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

////PACH actualizacion solo de alguno de los datos de la propiedad
router.patch(/propiedad\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var propiedad = {};
  for (var i = 0; i < keys.length; i++){
    propiedad[keys[i]] = req.body[keys[i]];
  }
  console.log(propiedad);
  Propiedad.findOneAndUpdate({_id: id}, propiedad, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
});


/// implementacion del Metodo PUT para actualizar las propiedades
router.put(/propiedad\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var oficialkes = ['estado', 'precio', 'descripcion', 'fecha_entrega', 'supterreno', 'amurallado',
   'servicios_basicos', 'anio_construccion', 'deshabitacion', 'descripcion_banio', 'numero_banios',
   'numero_habitacines', 'supconstruida', 'supterraza', 'pisos', 'elevador', 'baulera', 'piscina',
    'garaje', 'numparqueos', 'amoblado', 'fecha_publicacion', 'direccion', 'ubicacion', 'rating'];
  var result = _.difference(oficialkes, keys);
  if (result.length > 0){
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hhaces uso del metodo patch si desea editar solo un fragmento de la informacion"
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
  Propiedad.findOneAndUpdate({_id: id}, propiedad, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
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
    ciudad : req.body.ciudad,
    password : req.body.ciudad

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

//leer uno por uno los vendedores
router.get(/vendedor\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Vendedor.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});
//eliminar vendedores
router.delete(/vendedor\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Vendedor.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

////PACH actualizacion solo de alguno de los datos de los vendedores
router.patch(/vendedor\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var vendedor = {};
  console.log(vendedor);
  for (var i = 0; i < keys.length; i++){
    vendedor[keys[i]] = req.body[keys[i]];
  }
  Vendedor.findOneAndUpdate({_id: id}, vendedor, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
});


/// implementacion del Metodo PUT para actualizar los vendedores
router.put(/vendedor\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var oficialkes = ['nombre', 'apellido', 'telefono', 'telefono_ref', 'celular', 'email', 'Ciudad', 'password'];
  var result = _.difference(oficialkes, keys);
  if (result.length > 0){
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hhaces uso del metodo patch si desea editar solo un fragmento de la informacion"
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
    ciudad : req.body.ciudad,
    password : req.body.ciudad
  };
  Vendedor.findOneAndUpdate({_id: id}, vendedor, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
});
*/
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
    nombre_ciudad: req.body.nombre_ciudad,
    latitud: req.body.latitud,
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
//leer ciudad
router.get("/ciudad", (req, res, next) => {
  Ciudad.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});

//leer uno por uno los ciudades
router.get(/ciudad\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
Ciudad.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});
//eliminar ciudades
router.delete(/ciudad\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Ciudad.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

////PACH actualizacion solo de alguno de los datos de las ciudades
router.patch(/ciudad\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var ciudad = {};
  console.log(ciudad);
  for (var i = 0; i < keys.length; i++){
    ciudad[keys[i]] = req.body[keys[i]];
  }
  Ciudad.findOneAndUpdate({_id: id}, ciudad, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
});


/// implementacion del Metodo PUT para actualizar las ciudades
router.put(/ciudad\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var oficialkes = ['nombre_ciudad', 'latitud', 'longitud'];
  var result = _.difference(oficialkes, keys);
  if (result.length > 0){
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hhaces uso del metodo patch si desea editar solo un fragmento de la informacion"
    });
    return;
  }
  var ciudad = {
    nombre_ciudad: req.body.nombre_ciudad,
    latitud: req.body.latitud,
    longitud: req.body.longitud
  };
  Ciudad.findOneAndUpdate({_id: id}, ciudad, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
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

//leer uno por uno los precio
router.get(/precio\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
Precio.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});
//eliminar presio
router.delete(/precio\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Precio.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});


////PACH actualizacion solo de alguno de los datos de los presios
router.patch(/precio\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var precio = {};
  console.log(precio);
  for (var i = 0; i < keys.length; i++){
    precio[keys[i]] = req.body[keys[i]];
  }
  Precio.findOneAndUpdate({_id: id}, precio, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
});


/// implementacion del Metodo PUT para actualizar los precios
router.put(/precio\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var oficialkes = ['precio', 'preciolso', 'moneda', 'monedalso'];
  var result = _.difference(oficialkes, keys);
  if (result.length > 0){
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hhaces uso del metodo patch si desea editar solo un fragmento de la informacion"
    });
    return;
  }
  var precio = {
    precio: req.body.precio,
    presiolso: req.body.presiolso,
    moneda: req.body.moneda,
    monedalso: req.body.monedalso
  };
  Precio.findOneAndUpdate({_id: id}, precio, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
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
    nombre_zona: req.body.nombre_zona

  };
  var zonaData = new Zona(zona);

  zonaData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "zona Registrado con exito "
    });
  });
});

///leer zona
router.get("/zona", (req, res, next) => {
  Zona.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});

//leer uno por uno las zonas
router.get(/zona\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Zona.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});
//eliminar zonas
router.delete(/zona\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Zona.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

////PACH actualizacion solo de alguno de los datos de la zona
router.patch(/zona\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var zona = {};
  console.log(zona);
  for (var i = 0; i < keys.length; i++){
    zona[keys[i]] = req.body[keys[i]];
  }
  User.findOneAndUpdate({_id: id}, zona, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
});


/// implementacion del Metodo PUT para actualizar las zonas
router.put(/zona\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var oficialkes = ['nombre_zona'];
  var result = _.difference(oficialkes, keys);
  if (result.length > 0){
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hhaces uso del metodo patch si desea editar solo un fragmento de la informacion"
    });
    return;
  }
  var zona = {
  nombre_zona: req.body.nombre_zona
  };
  Zona.findOneAndUpdate({_id: id}, zona, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
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
    tipo_vivienda: req.body.tipo_vivienda

  };
  var tipoData = new Tipo(tipo);

  tipoData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "tipo Registrado con exito "
    });
  });
});

///leer tipo
router.get("/tipo", (req, res, next) => {
  Tipo.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});

//leer uno por uno los tipos
router.get(/tipo\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Tipo.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});
//eliminar tipos
router.delete(/tipo\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Tipo.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

////PACH actualizacion solo de alguno de los datos del tipo
router.patch(/tipo\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var tipo = {};
  console.log(tipo);
  for (var i = 0; i < keys.length; i++){
    tipo[keys[i]] = req.body[keys[i]];
  }
  Tipo.findOneAndUpdate({_id: id}, tipo, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
});


/// implementacion del Metodo PUT para actualizar los tipos
router.put(/tipo\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var oficialkes = ['tipo_vivienda'];
  var result = _.difference(oficialkes, keys);
  if (result.length > 0){
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hhaces uso del metodo patch si desea editar solo un fragmento de la informacion"
    });
    return;
  }
  var tipo = {
  tipo_vivienda: req.body.tipo_vivienda
  };
  Tipo.findOneAndUpdate({_id: id}, tipo, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
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
    tipo_oferta: req.body.tipo_oferta
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
//leer uno por uno las ofertas
router.get(/oferta\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Oferta.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});
//eliminar ofertas
router.delete(/oferta\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Oferta.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});


////PACH actualizacion solo de alguno de los datos de las ofertas
router.patch(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var oferta = {};
  console.log(oferta);
  for (var i = 0; i < keys.length; i++){
    oferta[keys[i]] = req.body[keys[i]];
  }
Oferta.findOneAndUpdate({_id: id}, oferta, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
});


/// implementacion del Metodo PUT para actualizar las ofertas
router.put(/oferta\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var oficialkes = ['tipo_oferta'];
  var result = _.difference(oficialkes, keys);
  if (result.length > 0){
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hhaces uso del metodo patch si desea editar solo un fragmento de la informacion"
    });
    return;

  var oferta = {
    tipo_oferta: req.body.tipo_oferta
  };
 Oferta.findOneAndUpdate({_id: id}, oferta, (err, params) => {
    if (err) {
      res.status(500).json({
        "msn": "Error mo se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
