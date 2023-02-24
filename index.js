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

//* Excepciones

//* si apuntamos a alguna ruta que no esta dentro de la carpeta publica , cuando desplegamos la app nos va a tirar un error
//* Cannot GET /auth/login
//* por eso ponemos , si no es una solicitud ni en la carpeta publica o en auth o en events 
//* un get a cualquier ruta , donde enviaremos el archivo index.html que se encuentra en la carpeta publica
//* aca recreamos el path donde esta la carpeta public

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
})

//* escuchar peticiones

app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

//* crear variables de entorno , por que no sabemos que puerto nos va a dar el hosting
//* en el archivo .env
