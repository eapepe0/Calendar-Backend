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

const { response } = require("express"); // se usa para tener el intelissensed de nuevo

const crearUsuario = (req, res = response) => {
  const { name, email, password } = req.body; // extraigo esto del body

  res.status(201).json({
    //* status de Usuario creado
    ok: true,
    msg: "registro",
    name,
    email,
    password,
  });
};

const revalidarToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

const loginUsuario = (req, res = response) => {
  const { email, password } = req.body; //* extraigo esto del body

  res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};
module.exports = {
  crearUsuario,
  revalidarToken,
  loginUsuario,
};
