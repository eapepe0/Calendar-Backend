const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require('cors');
require("dotenv").config();


//* leemos el archivo .env
//console.log(process.env); //procesos que corren en node junto con nuestro servidor

//* Crear servidor de express
const app = express();

//* Base de datos MongoDB

dbConnection();

//* Habilitamos CORS , antes de las rutas

app.use(cors())

//* Directorio publico
//* (use es un middleware , es una funcion que se ejecuta cuando alguien hace una peticion al servidor)

app.use(express.static("public"));

//* Lectura y parseo del body
//* las peticiones que lleguen en formato json , las vamos a procesar ahi y extraer su contenido

app.use(express.json());

//* Rutas

app.use("/api/auth", require("./routes/auth"));
app.use('/api/events', require('./routes/events'));


//* escuchar peticiones

app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

//* crear variables de entorno , por que no sabemos que puerto nos va a dar el hosting
//* en el archivo .env
