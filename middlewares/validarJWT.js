const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {

	const token = req.header('x-token'); //* leermos los headers enviados , el x-token
	if (!token) { //* no existe el token
		return res.status(401).json({ //* mensaje de error
			ok: false,
			msg: "No hay un token en la peticion"
		})
	}

	//* existe el token
	try {
		const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED); //* compara el token

		req.uid = uid; //* metemos los datos en el request , para que sean usados en el next (linea 28) , seran usadan en la funcion que sigue la cual es revalidarToken
		req.name = name; //* metemos los datos en el request , para que sean usados en el next (linea 28) , seran usadan en la funcion que sigue la cual es revalidarToken

	} catch (error) { //* el token no es valido
		return res.status(401).json({
			ok: false,
			msg: 'Token no valido'
		})
	}

	next();

}


module.exports = {
	validarJWT
}