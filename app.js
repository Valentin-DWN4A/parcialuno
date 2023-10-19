import express from "express";
import mongoose from "mongoose";
import canchas from "./routes/canchas.js"
import usuarios from "./routes/usuarios.js";
import auth from "./routes/auth.js";
import "dotenv/config";
import fs from "fs";

// 127.0.0.1
mongoose
  .connect("mongodb://127.0.0.1:27017/db_parcialuno", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado con la DB");
  })
  .catch(() => {
    console.log("Error al conectar con la DB");
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/canchas", canchas)
app.use("/usuarios", usuarios);
app.use("/login", auth);
app.use(express.static('public')); //para contenido estatico

app.get("/", (req, res) => {
  fs.readFile("index.html", "utf8", (err, data) => {
    if(err){
      res.status(500).send("Error al leer el archivo HTML");
      return;
    }
    res.send(data);
  }) 
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log("server running...");
});

