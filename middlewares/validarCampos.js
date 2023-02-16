const { response } = require("express");
const { validationResult } = require("express-validator");

//* el next se esta llamando internamente dentro de cada uno de los checks
const validarCampos = (req, res = response, next) => {
  //* manejo de errores
  const errors = validationResult(req); //* aca mandaremos el resultado de la validacion
  if (!errors.isEmpty()) {
    //* si errores no esta vacio
    return res.status(400).json({
      //* devolvemos status 400
      ok: false,
      errors: errors.mapped(),
    }); //* devolvemos los errores mapeados
  }
  next();
};

module.exports = {
  validarCampos,
};
