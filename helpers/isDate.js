const moment = require('moment')

const isDate = (value) => {

	if (!value) { //* si la fecha no existe devuelve falso
		return false;
	}
	const fecha = moment(value); //* convertimos la fecha con moment
	if (fecha.isValid()) { //* si es valida devolvemos verdadero
		return true
	}
	else {
		return false
	}
}

module.exports = {
	isDate
}