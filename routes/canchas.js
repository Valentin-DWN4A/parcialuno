import express  from "express";
import Cancha from "../models/canchas_model.js";
import verificarToken from "../middlewares/auth.js";
import Joi from "joi";

const ruta = express.Router();

const schema = Joi.object({
    nombre: Joi.string()
                .alphanum()
                .min(3)
                .max(20)
                .required(),
    direccion: Joi.string()
                .alphanum()
                .min(3)
                .max(20)
                .required(),
    deportes: Joi.string()
                .alphanum()
                .min(3)
                .max(20)
                .required(),
})

 ruta.get('/', verificarToken,(req, res) => {
    let resultado = listarCanchas();
    resultado.then(canchas => {
        res.json(canchas);
    }).catch(err => {
        res.status(400).json(err);
    })
}); 

ruta.get('/nombre/:nombre', verificarToken, async (req, res) => {
    const nombreParametro = req.params.nombre;
    let canchas =  await Cancha.find({nombre:nombreParametro});
    if (canchas.length > 0) {
        res.json({ canchas });
      } else {
        res.send('No se encontraron canchas con ese nombre');
      }
});
//////////////////////////////////////////////////////////////
/* ruta.get('/nombre/:nombre', verificarToken, async (req, res) => {
    const nombreParametro = req.params.nombre;
    let canchas =  await Cancha.find({nombre:nombreParametro});
    if (canchas.length > 0) {
        res.json({ canchas });
      } else {
        res.send('No se encontraron canchas con ese nombre');
      }
}); */
//////////////////////////////////////////////////////////////
ruta.put("/:nombre", verificarToken, (req, res)=> {
    let resultado = actualizarCancha(req.body, req.params.nombre);
    resultado.then(valor => {
        res.json({
            valor
        })
    }).catch(err => {
            res.status(400).json({err})
        })
})

async function actualizarCancha(body, nombre){
    let cancha = await Cancha.updateOne({"nombre": nombre}, {
        $set:{
            nombre      : body.nombre,
            direccion   : body.direccion,
            deportes    : body.deportes,
            descripcion : body.descripcion,
            horarios    : body.horarios,
            vestuarios  : body.vestuarios
        }
    })
    return cancha;
}

ruta.post("/", verificarToken, (req, res) => {
    let body = req.body;

    const {error, value} = schema.validate({
        nombre: body.nombre,
        direccion: body.direccion,
        deportes: body.deportes,
    })

    if(!error){
    let resultado = crearCancha(body);
    resultado.then(cancha => {
        res.json({
            valor: cancha
        })
    }).catch(err => {
        res.status(400).json({err})
    })
   }else{
    res.status(400).json({
        error
     })
    }
})

async function crearCancha(body){
    let cancha = new Cancha({
        nombre      : body.nombre,
        direccion   : body.direccion,
        deportes    : body.deportes,
        descripcion : body.descripcion,
        horarios    : body.horarios,
        vestuarios  : body.vestuarios
    });
    return await cancha.save();
}

ruta.delete("/:id", verificarToken, async (req, res) => {
    const canchaID = req.params.id;
    const cancha = await Cancha.findByIdAndDelete(canchaID);
    if(cancha){
        res.json({ mensaje: "Cancha eliminada"});
    }else{
        res.status(404).json({error: "Cancha no encontrada"})
    }
})

ruta.get("/paginado", verificarToken, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    try {
        const canchas = await Cancha.find()
            .skip(skip)
            .limit(limit);

        res.json({ canchas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function listarCanchas(){
    let canchas = await Cancha.find().sort({ nombre:-1 })
    return canchas;
}
export default ruta;