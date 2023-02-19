//*======================================================
//* aca van las funciones que se usaran en las rutas
//*======================================================

//*======================================================
// * req = es lo que la persona solicita
// * res = es lo que nosotros respondemos
// *
// * solo puede haber un res.json por funcion
//*======================================================

//* (no debemos confiar en las solicitudes que nos envian desde el frontend
//* hacer nuestras propias validaciones)

const { response } = require("express"); // se usa para tener el intelissense de nuevo
const bcrypt = require('bcryptjs')
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {

	const { email, password } = req.body
	try {
		let usuario = await Usuario.findOne({ email: email }) //* buscamos en la DB si existe el mail 
		if (usuario) { //* si devuelve algo significa que existe en nuestra DB
			return res.status(400).json({ //* devolvemos un mensaje de error
				ok: false,
				msg: 'Un usuario existe con ese correo!!!'
			})
		}
		usuario = new Usuario(req.body) //* usamos la instancia de Usuario con los datos name, email y password
		//* Encriptar contraseña
		const salt = bcrypt.genSaltSync(); //* creamos unas 10 vueltas de encriptacion (10 valor por defecto)
		usuario.password = bcrypt.hashSync(password, salt); // * cambiamos el password que va a ser grabado , haciendole un hash al password

		//* generar JWT

		const token = await generarJWT(usuario.id, usuario.name);
		await usuario.save(); //* guardamos los datos en MongoDB usando los datos pasados por el req.body en el formato que pasamos el esquema */

		res.status(201).json({
			//* status de Usuario creado
			ok: true,
			msg: "registro , usuario creado",
			uid: usuario.id,
			name: usuario.name,
			token
		});
	} catch (error) { //* si hay un error 
		res.status(500).json({ //* mostramos el estatus 500 y el error
			ok: false,
			msg: 'hubo un error en la base de datos'
		})
	}
};

const revalidarToken = async (req, res = response) => {

	const uid = req.uid; //* extraemos los datos del request , el cual pusimos en validarJWT 
	const name = req.name; //* extraemos los datos del request , el cual pusimos en validarJWT

	const token = await generarJWT(uid, name); //* generamos un nuevo token

	res.json({
		ok: true,
		uid: uid,
		name: name,
		msg: "renew",
		token: token,
	});
};

const loginUsuario = async (req, res = response) => {
	const { email, password } = req.body; //* extraigo esto del body

	try {
		const usuario = await Usuario.findOne({ email: email }) //* buscamos en la DB si existe el mail 
		console.log(usuario)
		if (!usuario) { //* si el usuario no existe
			return res.status(400).json({ //* devolvemos un mensaje de error
				ok: false,
				msg: 'Un usuario no existe con ese correo!!!'
			})
		}

		//* confirmar passwords

		const validPassword = bcrypt.compareSync(password, usuario.password) //* comparamos el password enviado con el password del DB
		if (!validPassword) { //* si devuelve false , mensaje de incorrecto
			return res.status(400).json({
				ok: false,
				msg: 'password incorrecto'
			})
		}
		//* generar JWT
		const token = await generarJWT(usuario.id, usuario.name);
		res.json({
			ok: true,
			msg: "login",
			uid: usuario.id,
			name: usuario.name,
			token
		});

	} catch (error) { //* si hay un error 
		res.status(400).json({ //* mostramos el estatus 400 y el error
			ok: false,
			msg: 'El usuario o la contraseña no existen'
		})
	}

};
module.exports = {
	crearUsuario,
	revalidarToken,
	loginUsuario,
};
