const { Schema, model } = require('mongoose');


//* definimos como luce el esquema , es como se veran los datos en nuestra DB
//* asi se veran los eventos

const EventoSchema = Schema({
	title: {
		type: String,
		required: true,
	},
	notes: {
		type: String,
	},
	start: {
		type: Date,
		required: true,
	},
	end: {
		type: Date,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId, //* Le decimos a mongoose que va a ser una referencia AL 
		ref: 'Usuario', //* es el nombre del otro esquema
		required: true,
	}
})


//* usamos el serializador toJson
//* asi podemos modificarlo
EventoSchema.method('toJSON', function () {
	//* extraemos el __v ,el _id y el resto del objeto con el spread
	const { __v, _id, ...object } = this.toObject();
	//* le agregamos al objeto algo llamado id el cual sera el _id creado por mongo
	object.id = _id;
	return object
})




module.exports = model('Evento', EventoSchema)