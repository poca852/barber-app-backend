const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { UserModel, Rolmodel } = require("../models");
const { generarJWT, googleVerify } = require("../helpers");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });

    // comparamos los passwords
    const validPass = bcryptjs.compareSync(password, user.password);
    if (!validPass) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    const token = await generarJWT(user.id);

    res.status(200).json({
      ok: true,
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const signGoogle = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const user = await googleVerify(id_token);

    const [userModel, isCreate] = await UserModel.findOrCreate({
      where: {
        email: user.correo,
      },
      defaults: {
        email: user.correo,
        name: user.nombre,
        password: ":)",
        avatar: user.img,
        google: true,
      },
    });

    const token = await generarJWT(userModel.id);

    res.status(200).json({
      ok: true,
      email: userModel.email,
      img: userModel.avatar,
      id: userModel.id,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "hable con el administrador",
    });
  }
};

const renew = async (req = request, res = response) => {
  const { user } = req;
  try {
    const token = await generarJWT(user.id);

    res.status(200).json({
      ok: true,
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const auth0 = async (req = request, res = response) => {
  const { email, name, picture, email_verified, rol } = req.body;

  try {
    const verificarEmail = await UserModel.findOne({
      where: { email },
    });

    if (!verificarEmail) {
      //  si no existe el usuario es porque se debe crear el usuario
      const password = bcryptjs.hashSync(`${email}${name}`, 10);

      // buscamos el rol en la db
      const queryRolModel = rol.toUpperCase();
      const rolModel = await Rolmodel.findOne({where: {rol: queryRolModel}});
      const idRol = rolModel.id

      // generamos la data que guardaremos
      const data = {
        email, name, avatar: picture, email_verified, password, idRol
      }

      const newUser = await UserModel.create(data);

      if(newUser.email_verified){
        const token = await generarJWT(newUser.id);
        return res.status(201).json({
          ok: true,
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          picture: newUser.avatar,
          token
        })
      }else{
        return res.status(201).json({
          ok: false,
          msg: "Pendiente verificar email"
        })
      }

    }else{
      // caso contrario es porque el usuario ya existe en la db pero debemos verificar que su email_verified este en true
      if(verificarEmail.email_verified){
        // comparamos los password
        const validPass = bcryptjs.compareSync(`${email}${name}`, verificarEmail.password);
        if(!validPass){
          return res.status(401).json({
            ok: true,
            msg: 'Verifica tus datos'
          })
        }

        const token = await generarJWT(verificarEmail.id);

        return res.status(200).json({
          ok: true,
          id: verificarEmail.id,
          email: verificarEmail.email,
          name: verificarEmail.name,
          picture: verificarEmail.avatar,
          token
        })
      }else{
        return res.status(401).json({
          ok: false,
          msg: 'Por favor confirma tu email'
        })
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
  renew,
  signGoogle,
  auth0,
};
