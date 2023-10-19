import express  from "express";
import verificarToken from "../middlewares/auth.js";
import { actualizarCanchasController, borrarCanchaPorId, 
        crearCanchaController, filtrarCanchasPorBarrio, filtrarCanchasPorNombre, 
        listarCanchasController, listarCanchasPaginadas } 
        from "../controllers/CanchasController.js";

const ruta = express.Router();

ruta.get('/', verificarToken, listarCanchasController);
ruta.get('/nombre/:nombre', verificarToken, filtrarCanchasPorNombre);
ruta.get('/barrio/:barrio', verificarToken, filtrarCanchasPorBarrio);
ruta.get("/paginado", verificarToken, listarCanchasPaginadas);
ruta.put("/:nombre", verificarToken, actualizarCanchasController);
ruta.post("/", verificarToken, crearCanchaController);
ruta.delete("/:id", verificarToken, borrarCanchaPorId);

export default ruta;