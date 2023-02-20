const { Schema, model } = require('mongoose');

//* definimos como luce el esquema , es como se veran los datos en nuestra DB
//* asi se veran los usuarios

const UsuarioSchema = Schema({
	name: { //* nombre 
		type: String, //* que es una string
		required: true //* si o si tiene que estar
	},
	email: {
		type: String, //* que es una string
		required: true, //* si o si tiene que estar
		unique: true //* tiene que ser unico en nuestra DB
	},
	password: {
		type: String, //* que es una string
		required: true, //* si o si tiene que estar

	}
});

module.exports = model('Usuario', UsuarioSchema)