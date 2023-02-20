const { response } = require("express")
const Evento = require('../models/Evento')

const getEventos = async (req, res = response) => {
	const eventos = await Evento.find().populate('user', 'name') //* buscamos los eventos con el find sin parametros asi busca todo

	//* con populate mostramos mas datos del usuario , no solamente el id
	//* con el segundo parametro (name) , mostramos solamente de todos los datos el id (viene por defecto) y el name

	return res.status(200).json({ //* devolvemos el json 
		ok: true,
		msg: 'obtener eventos',
		eventos
	})
};

const crearEvento = async (req, res = response) => {

	const evento = new Evento(req.body)  //* creamos un evento en mongoose
	evento.user = req.uid;  //* le agregamos el id del usuario como user 

	try {
		const eventoGuardado = await evento.save() //* si esto funciona guardamos en la DB

		//* devolvemos un json con el evento guardado
		return res.json({
			ok: true,
			evento: eventoGuardado
		})

	} catch (error) { //* si hubo algun error
		console.log(error) //* mostramos el error en consola

		return res.status(500).json({ //* revolvemos un error 
			ok: false,
			msg: "Contactese con el administrador"
		})
	}

};

const actualizarEvento = async (req, res = response) => {

	//* obtener el id que viene en la url de la peticion
	const eventoId = req.params.id;
	const uid = req.uid;

	//* El id es de 24 caracteres ?
	if (eventoId.length !== 24) {
		return res.status(400).json({
			ok: false,
			msg: 'El Id debe tener 24 caracteres'
		})
	}

	try {
		//* buscamos el evento por el id
		const evento = await Evento.findById(eventoId)

		//* Si el evento no existe por ese id
		if (!evento) {
			return res.status(404).json({
				ok: false,
				msg: 'Evento no existe por ese id'
			})
		}

		//* si el usuario es distinto al usuario que creo la el evento
		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No tiene el privilegio para editar este evento'
			})
		}
		//* Creamos un nuevo evento , donde copiamos todo el contenido , y le agregamose el user con su respectivo id
		const nuevoEvento = {
			...req.body,
			user: uid
		}
		const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
		//* si actualizamos el evento con solo dos parametros devuelve en pantalla el viejo evento para comparar
		//* para que se muestre en pantalla hay que agregar las opciones {new : true} , retorna el evento actualizado

		return res.status(200).json({
			ok: true,
			msg: 'actualizar evento',
			evento: eventoActualizado
		})
	} catch (error) {

		console.log(error)
		return res.status(500).json({
			ok: false,
			msg: "Contactese con el administrador"
		})
	}

};

const borrarEvento = async (req, res = response) => {

	const eventoId = req.params.id;
	const uid = req.uid;

	//* El id es de 24 caracteres ?
	if (eventoId.length !== 24) {
		return res.status(400).json({
			ok: false,
			msg: 'El Id debe tener 24 caracteres'
		})
	}

	try {
		const evento = await Evento.findById(eventoId)
		console.log(evento)
		if (!evento) {
			return res.status(404).json({
				ok: false,
				msg: 'Evento que quiere borrar no existe por ese id'
			})
		}
		if (evento.user.toString() !== uid) { //* si el usuario es distinto al usuario que creo la el evento
			return res.status(401).json({
				ok: false,
				msg: 'No tiene el privilegio para eliminar este evento'
			})
		}
		const eventoBorrado = await Evento.findByIdAndDelete(eventoId);
		return res.status(200).json({
			//llamado con un  id
			ok: true,
			msg: 'borrar evento',
			eventoBorrado
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			ok: false,
			msg: "Contactese con el administrador"
		})
	}
};


module.exports = {
	crearEvento,
	actualizarEvento,
	borrarEvento,
	getEventos,
}