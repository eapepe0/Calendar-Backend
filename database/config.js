const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect(process.env.DB_CNN); //* mongo se conecta con la URL dada en .env
		console.log("DB online"); //* si es correcto da un console.log()
	} catch (error) { //* si hubo algun error
		console.log(error);
		throw new Error("Error al inicializar la base de datos!!!");
	}
};

module.exports = {
	dbConnection,
};
