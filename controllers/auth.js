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
      include: {
        model: Rolmodel,
        attributes: ["rol"],
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
      rol: user.rol.rol,
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

module.exports = {
  login,
  renew,
  signGoogle
};
