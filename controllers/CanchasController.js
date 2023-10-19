import {listarCanchas, crearCancha, actualizarCancha} from "../services/CanchasServices.js";
import Cancha from "../models/canchas_model.js";
import schema from "../middlewares/validateCanchas.js";

const listarCanchasController = (req, res) => {
    let resultado = listarCanchas();
    resultado.then(canchas => {
        res.json(canchas);
    }).catch(err => {
        res.status(400).json(err);
    })
} 

const filtrarCanchasPorNombre = async (req, res) =>{
    const nombreParametro = req.params.nombre;
    let canchas =  await Cancha.find({nombre:nombreParametro});
    if (canchas.length > 0) {
        res.json({ canchas });
      } else {
        res.send('No se encontraron canchas con ese nombre');
      }
}
const filtrarCanchasPorBarrio = async (req, res) =>{
    const barrioParametro = req.params.nombre;
    let barrios =  await Cancha.find({barrio:barrioParametro});
    if (barrios.length > 0) {
        res.json({ barrios });
      } else {
        res.send('No se encontraron canchas con ese nombre');
      }
}
const actualizarCanchasController = (req, res) =>{
    let resultado = actualizarCancha(req.body, req.params.nombre);
    resultado.then(valor => {
        res.json({
            valor
        })
    }).catch(err => {
            res.status(400).json({err})
        })
}

const crearCanchaController = (req, res) => {
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
};

const borrarCanchaPorId = async (req, res) => {
    const canchaID = req.params.id;
    const cancha = await Cancha.findByIdAndDelete(canchaID);
    if(cancha){
        res.json({ mensaje: "Cancha eliminada"});
    }else{
        res.status(404).json({error: "Cancha no encontrada"})
    }
}

const listarCanchasPaginadas = async (req, res) => {
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
}

export { listarCanchasController, filtrarCanchasPorBarrio, 
        filtrarCanchasPorNombre, actualizarCanchasController, 
        crearCanchaController, borrarCanchaPorId, listarCanchasPaginadas }