const jwt = require('jsonwebtoken');

//* uid y name estaran encriptados en el JWT
const generarJWT = (uid, name) => {
	return new Promise((resolve, reject) => { //* creamos una promesa con 2 resultados o se resuelve o te rechaza
		const payload = { uid, name }; //* le mandamos el payload en el que usamos el uid que nos da mongo y el nomnre
		jwt.sign(payload, process.env.SECRET_JWT_SEED, { //* firmamos la JWT con la palabra secreta
			expiresIn: '2h' //* le mandamos como otra opcion que expire en 2hs
		}, (err, token) => { //* si tira un error o nos genera el token
			if (err) {
				console.log(err);
				reject("No se pudo generar el token") //* si nos rechaza 
			}
			resolve(token) //* si se resuelve correctamente nos genera el token
		})
	})
}

module.exports = {
	generarJWT
}