var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');
var _ = require("underscore");
var User = require("../../../database/collection/user");
var Propiedad = require("../../../database/collection/propiedad");

var Img = require("../../../database/collection/img");

var jwt = require("jsonwebtoken");

var storage = multer.diskStorage({
  destination: "./public/avatars",
  filename: function (req, file, cb) {
    console.log("-------------------------");
    console.log(file);
    cb(null, "IMG_" + Date.now() + ".jpg");
  }
});
var upload = multer({
  storage: storage
}).single("img");;
///////login del usuario
/*router.post("/login", (req, res, next) => {
  var agentename = req.body.agentename;
  var password = req.body.password;
  var result = Usuario.findOne({nombre_agente: agentename, password_agente: password}).exec((err, doc) => {
    if (err) {
      res.status(200).json({
        msn : "No se puede completar con la peticion"
      });
      return;
    }
    if (doc) {
      jwt.sign({nombre_agente: doc.nombre_agente, password_agente: doc.password_agente}, "secretkey123", (err, token) => {
        console.log(err);
        res.status(200).json({
         token : token
        });
      })
    } else {
      res.status(200).json({
        msn : "El agente no existe en la base de satos"
      });
    }
  });
});

//////Middleware
function verifytoken (req, res, next) {
  //recuperacion del header
  const header = req.headers["authorization"];
  if (header == undefined ) {
    res.status(403).json({
      msn: "No autorizado"
    })
  } else {
    req.token = header.split(" ")[1]
    next();
  }
}*/
//////crear propiedadimg
router.post(/propiedadimg\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({
        "msn" : err
      });
    } else {
      var ruta = req.file.path.substr(6, req.file.path.length);
      console.log(ruta);
      var img = {
        idpropiedad: id,
        name : req.file.originalname,
        physicalpath: req.file.path,
        relativepath: "http://localhost:7777" + ruta
      };
      var imgData = new Img(img);
      imgData.save().then( (infoimg) => {
        //content-type
        var propiedad = {
          gallery: new Array()
        }
        Propiedad.findOne({_id: id}).exec( (err, docs) => {
          var data = docs.gallery;
          var aux = new Array();
          if (data.length == 1 && data[0] == "") {
            propiedad.gallery.push("/api/v1.0/propiedadimg/" + infoimg._id)
          } else {
            aux.push("/api/v1.0/propiedadimg/" + infoimg._id);
            data = data.concat(aux);
            propiedad.gallery = data;
          }
          Propiedad.findOneAndUpdate({_id : id}, propiedad, (err, params) => {
            if (err) {
              res.status(500).json({
                "msn" : "error en la actualizacion del usuario"
              });
              return;
            }
            res.status(200).json( req.file);
            return;
          });
        });
      });
    }
  });
});
///mostrar imagen
router.get(/propiedadimg\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  console.log(id)
  Img.findOne({_id : id}).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn" : "Ocurrio algun error en el servicio"
      });
      return;
    }
    var img = fs.readFileSync("./" + docs.physicalpath);
    res.contentType('image/jpeg');
    res.status(200).send(img);
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
/////////////// Mapa Latitud y Longitud//////////////////////7
router.post("/sendcoloords", function(req, res){
    var cadena = req.body;
    console.log(cadena);
    var exp = /[{]{1,1}[0-9.,-]{1,}[}]{1,1}/g
    var r = cadena.match(exp);
    for (var i = 0 ; i < r.length ; i++){
      var n = r[i].match(exp2);
      propiedad.push("/api/v1.0/sendcoloords/" + {lat: n[0], lng: n[1]});
    }
    console.log(propiedad);
    for(var i =0 ; i<propiedad.length; i++){
      query.save("propiedad",data,function(r){
      });
    }
    res.send({result:true});
});
router.get("/getCoors", function(req, res){
  query.get("propiedad").execute(function(result){
    req.send(result);
  });
});
//////////////////////////propiedad/////////////////////////////////
//insertar
router.post("/propiedad", (req, res) => {

  if (req.body.nombre_dueno == "" && req.body.apellido_dueno == "") {
    res.status(400).json({
      "msn" : "formato de llenado incorrecto"
    });
    return;
  }
  var propiedad = {
    vender_alqui_anticre: req.body.vender_alqui_anticre,
    estado: req.body.estado,
    descripcion: req.body.descripcion,
  //fecha_entrega: req.body.fecha_entrega,
    supterreno: req.body.supterreno,
    amurallado: req.body.amurallado,
    servicios_basicos: req.body.servicios_basicos,
    otros: req.body.otros,
    //anio_construccion: req.body.anio_construccion,
    //deshabitacion: req.body.deshabitacion,
    //descripcion_banio: req.body.descripcion_banio,
    numero_banios: req.body.numero_banios,
    numero_habitaciones: req.body.numero_habitaciones,
    nuemro_cocinas: req.body.numero_cocinas,
    //supconstruida: req.body.supconstruida,
    //supterraza: req.body.supterraza,
    pisos: req.body.pisos,
    elevador: req.body.elevador,
    //baulera: req.body.baulera,
    piscina: req.body.piscina,
    garaje: req.body.garaje,
    //numparqueos: req.body.numparqueos,
    amoblado:req.body.amoblado,
    //fecha_publicacion: req.body.fecha_publicacion,
    direccion: req.body.direccion,
    ubicacion:req.body.ubicacion,
    //rating: req.body.rating,
    precio: req.body.precio,
    moneda: req.body.moneda,
    //tipo_oferta: req.body.tipo_oferta,
    tipo_vivienda: req.body.tipo_vivienda,
    nombre_zona: req.body.nombre_zona,
    nombre_ciudad: req.body.nombre_ciudad,
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    gallery: "",
    nombre_dueno: req.body.nombre_dueno,
    apellido_dueno: req.body.apellido_dueno,
    telefono_dueno: req.body.telefono_dueno,
    //telefono_ref_dueno: req.body.telefono_ref_dueno,
    celular_dueno: req.body.celular_dueno,
    email_dueno: req.body.email_dueno
  };
  var propiedadData =new Propiedad(propiedad);
  propiedadData.save().then( (rr) => {
    //content-type
    res.status(200).json({
      "id" : rr_id,
      "msn" : "propiedad  Registrado con exito "
    });
  });
/*
  /////palabra wordkey
  var informacion = Propiedad.find({precio : {$ne: null}, nombre_ciudad: {$ne: null}, nombre_dueno: {$ne: null}}).exec( (error, docs) => {
    res.status(200).json({
       docs
    });
  });
  var wordkey = req.body.wordkey;
  var expreg = new RegExp(wordkey);
  var result = informacion.filter((key) => {
      if (key.search(expreg) > -1) {
        return true;
      }
      return false;
  });
  res.send(
    {
      "wordkey" : wordkey,
      "result" : result
    });
    */
});

  //leer propiedad
router.get("/propiedad", (req, res, next) => {
  Propiedad.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  });
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
  var oficialkes = ['vender_alqui_anticre', 'estado', 'descripcion', 'supterreno', 'amurallado',
   'servicios_basicos', 'otros', 'numero_banios','numero_habitacines', 'nuemro_cocinas','pisos', 'elevador', 'piscina',
    'garaje', 'amoblado', 'direccion', 'ubicacion', 'precio', 'moneda', 'tipo_vivienda',
    'nombre_zona', 'nombre_ciudad', 'latitud', 'longitud',
'nombre_dueno', 'apellido_dueno', 'telefono_dueno', 'celular_dueno', 'email_dueno'];
  var result = _.difference(oficialkes, keys);
  if (result.length > 0){
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hhaces uso del metodo patch si desea editar solo un fragmento de la informacion"
    });
    return;
  }
  var propiedad = {
    vender_alqui_anticre: req.body.vender_alqui_anticre,
    estado: req.body.estado,
    descripcion: req.body.descripcion,
    //fecha_entrega: req.body.fecha_entrega,
    supterreno: req.body.supterreno,
    amurallado: req.body.amurallado,
    servicios_basicos: req.body.servicios_basicos,
    otros: req.body.otros,
    //anio_construccion: req.body.anio_construccion,
    //deshabitacion: req.body.deshabitacion,
    //descripcion_banio: req.body.descripcion_banio,
    numero_banios: req.body.numero_banios,
    numero_habitaciones: req.body.numero_habitaciones,
    numero_cocinas: req.body.numero_cocinas,
    //supconstruida: req.body.supconstruida,
    //supterraza: req.body.supterraza,
    pisos: req.body.pisos,
    elevador: req.body.elevador,
    //baulera: req.body.baulera,
    piscina: req.body.piscina,
    garaje: req.body.garaje,
    //numparqueos: req.body.numparqueos,
    amoblado:req.body.amoblado,
    //fecha_publicacion: req.body.fecha_publicacion,
    direccion: req.body.direccion,
    ubicacion:req.body.ubicacion,
    //rating: req.body.rating,
    precio: req.body.precio,
    moneda: req.body.moneda,
    //tipo_oferta: req.body.tipo_oferta,
    tipo_vivienda: req.body.tipo_vivienda,
    nombre_zona: req.body.nombre_zona,
    nombre_ciudad: req.body.nombre_ciudad,
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    gallery: "",
    nombre_dueno: req.body.nombre_dueno,
    apellido_dueno: req.body.apellido_dueno,
    telefono_dueno: req.body.telefono_dueno,
    //telefono_ref_dueno: req.body.telefono_ref_dueno,
    celular_dueno: req.body.celular_dueno,
    email_dueno: req.body.email_dueno
    //ciudad_dueno: req.body.ciudad_dueno
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

///////////////////////////////Filtro para el precio///////////////////
router.get("/propiedadfiltro", (req, res, next) => {

  var params = req.query;
  var precio = params.precio;
  console.log(precio);
  var over = params.over;
  console.log(over);
  if(precio == undefined && over == undefined){
    Propiedad.find({lat: {$ne: null}, lon: {$ne: null}}).exec( (error, docs) => {
      res.status(200).json({
        info: docs
      });
    })
    return;
  }
  if(over == "equals"){
   console.log("---------->")
   Propiedad.find({precio : precio, nombre_ciudad: {$ne: null}, nombre_dueno: {$ne: null}}).exec( (error, docs) => {
     res.status(200).json({
        docs
     });
   });
   return;
 }
 else if (over == "true"){
   Propiedad.find({precio: {$gt:precio}, nombre_ciudad: {$ne: null}, nombre_dueno: {$ne: null}}).exec( (error, docs) => {
     res.status(200).json({
       info: docs
     });
   })
 }
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' })
});
module.exports = router;
