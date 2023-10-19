import Cancha from "../models/canchas_model.js";

async function listarCanchas(){
    let canchas = await Cancha.find().sort({ nombre:1 })
    return canchas;
}

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

export { listarCanchas, actualizarCancha, crearCancha }