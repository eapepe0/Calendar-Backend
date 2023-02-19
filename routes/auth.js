/**
 * Rutas de usuarios / Auth
 * host + /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
const {
	crearUsuario,
	revalidarToken,
	loginUsuario,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require('../middlewares/validarJWT')


const router = Router();
//* recibe login y password para loguearse
router.post(
	"/",
	[
		check("email", "El email es obligatorio").isEmail(),
		check(
			"password",
			"El password debe de ser de minimo 6 caracteres"
		).isLength({
			min: 6,
		}),
		validarCampos,
	],
	loginUsuario
); //* localhost/api/auth

//* recibe email y password para crear un usuario
router.post(
	"/new",
	[
		//* middleware , le pasamos un custom middleware (validarCampos)
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		check(
			"password",
			"El password es debe ser de minimo 6 caracteres"
		).isLength({
			min: 6,
		}),
		validarCampos,
	],
	crearUsuario
); //* localhost/api/auth/new
//
router.get("/renew", validarJWT, revalidarToken); //localhost/api/auth/renew

module.exports = router;
