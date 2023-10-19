import express  from "express";
import verificarToken from "../middlewares/auth.js";
import { listarUsuariosController, filtrarUsuariosPorNombre, 
        filtrarUsuariosPorId, crearUsuarioController, 
        actualizarUsuarioController, borrarUsuarioPorId, 
        listarUsuariosPaginados } 
        from "../controllers/UsuariosController.js";

const ruta = express.Router();

ruta.get('/', verificarToken, listarUsuariosController);
ruta.get('/nombre/:nombre', verificarToken, filtrarUsuariosPorNombre);
ruta.get('/id/:id', verificarToken, filtrarUsuariosPorId);
ruta.get('/paginado', verificarToken, listarUsuariosPaginados);
ruta.post('/', crearUsuarioController);
ruta.put('/:email', verificarToken, actualizarUsuarioController);
ruta.delete('/:id', verificarToken, borrarUsuarioPorId);


export default ruta;