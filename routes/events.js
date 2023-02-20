//* Crearemos el  CRUD aca (CREATE , READ , UPDATE , DELETE )
/**
 * Rutas de eventos
 * /api/events
 */

const { Router } = require("express");
const router = Router();
const { validarJWT } = require('../middlewares/validarJWT')
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos")
const { isDate } = require('../helpers/isDate')

//* Todas las peticiones tiene que estar validadas por el token
router.use(validarJWT)
//* todas la rutas abajo del use <middleware> seran protegidas por el token



//* Obtener eventos
router.get('/', getEventos)

//* Crear nuevo evento

router.post('/', [
	check('title', "El titulo es obligatorio").not().isEmpty(),
	check('start', "La fecha de inicio es obligatoria").custom(isDate),
	check('end', "La fecha de finalizacion es obligatoria").custom(isDate),
	validarCampos
], crearEvento)

//* Actualizar evento

router.put('/:id', [
	check('title', "El titulo es obligatorio").not().isEmpty(),
	check('start', "La fecha de inicio es obligatoria").custom(isDate),
	check('end', "La fecha de finalizacion es obligatoria").custom(isDate),
	validarCampos
], actualizarEvento)

//* borrar evento

router.delete('/:id', borrarEvento)

module.exports = router;