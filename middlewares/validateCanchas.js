import Joi from "joi";

const schema = Joi.object({
    nombre: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),
    direccion: Joi.string()
        .min(5)
        .max(100)
        .required(),
    deportes: Joi.array()
        .items(Joi.string())
        .min(1)
        .max(10)
        .required(),
    descripcion: Joi.string()
        .min(5)
        .max(200)
        .allow(null),
    horarios: Joi.string()
        .min(5)
        .max(100)
        .allow(null),
    vestuarios: Joi.boolean()
        .allow(null),
    imagen: Joi.string()
        .min(5)
        .max(200)
        .allow(null), 
});

export default schema;
