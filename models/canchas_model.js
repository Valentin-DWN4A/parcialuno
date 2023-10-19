import mongoose from "mongoose";
//const Schema = mongoose.Schema;
const canchaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    deportes: {
        type: Array,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },    
    horarios:{
        type: String,
        required: false
    },
    vestuarios:{
        type: Boolean,
        required: false
    },
    imagen: {
        type: String,
        required: false
    }
});

export default mongoose.model('Canchas', canchaSchema);