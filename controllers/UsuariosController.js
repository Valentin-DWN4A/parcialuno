import {listarUsuarios, crearUsuario, actualizarUsuario} from "../services/UsuariosServices.js";
import Usuario from "../models/usuarios_model.js";
import schema from "../middlewares/validateUsuarios.js"

const listarUsuariosController = (req, res) =>{
    let resultado = listarUsuarios();
    resultado.then(users => {
        res.json({
            users
        })
    }).catch(err => {
        res.status(400).json({err})
    })
}

const filtrarUsuariosPorNombre = async (req, res) => {
    const nombreParametro = req.params.nombre;
    let usuarios = await Usuario.find({nombre:nombreParametro});
    if (usuarios.length > 0) {
        res.json({ usuarios });
      } else {
        res.send('No se encontraron usuarios con ese nombre');
      }
}

const filtrarUsuariosPorId = async (req, res) => {
    const usuarioID = req.params.id;
    const usuario = await Usuario.findById(usuarioID);

    if (usuario) {
        res.json({ usuario });
    } else {
        res.status(404).json({ error: "Usuario no encontrado" });
    }
}

const listarUsuariosPaginados = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;
    try {
        const usuarios = await Usuario.find()
            .skip(skip)
            .limit(limit);

        res.json({ usuarios });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const crearUsuarioController = (req, res) => {
    let body = req.body;
 
    const {error, value} = schema.validate({
     nombre: body.nombre,
     email: body.email,
     password: body.password,
     })
     if(!error){
     let resultado = crearUsuario(body);
     resultado.then(user => {
         res.json({
             valor: user
         })
     }).catch(err => {
         res.status(400).json({err})
     })
   }else{
     res.status(400).json({
         error
 })
 }
}

const actualizarUsuarioController = (req, res) => {
    let resultado = actualizarUsuario(req.body, req.params.email);
    resultado.then(valor => {
        res.json({
            valor
        })
    }).catch(err => {
            res.status(400).json({err})
        })
}

const borrarUsuarioPorId = async (req, res) => {
    const usuarioID = req.params.id;
    const usuario = await Usuario.findByIdAndDelete(usuarioID);
    if(usuario){
        res.json({ mensaje: "Usuario eliminado"});
    }else{
        res.status(404).json({error: "Usuario no encontrado"})
    }
}


export {listarUsuariosController, filtrarUsuariosPorNombre, 
        filtrarUsuariosPorId, crearUsuarioController, actualizarUsuarioController, borrarUsuarioPorId, 
        listarUsuariosPaginados};