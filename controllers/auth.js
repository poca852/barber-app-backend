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

    if(!user.state){
      return res.status(400).json({ok:false,msg:"Acceso denegado"});
    }

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
      phone: user.phone,
      img: user.avatar,
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

    const rolModel = await Rolmodel.findOne({
      where: {
        rol: 'CLIENT'
      }
    });

    const [userModel, isCreate] = await UserModel.findOrCreate({
      where: {
        email: user.correo,
      },
      defaults: {
        email: user.correo,
        name: user.nombre,
        phone: '',
        password: ":)",
        avatar: user.img,
        google: true,
        idRol: rolModel.id
      },
    });

    if(!userModel.state){
      return res.status(400).json({ok:false,msg:"Acceso denegado"});
    }

    const token = await generarJWT(userModel.id);

    res.status(200).json({
      ok: true,
      id: userModel.id,
      email: userModel.email,
      name: userModel.name,
      img: userModel.avatar,
      rol: rolModel.rol,
      phone: userModel.phone,
      img: userModel.avatar,
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
      rol: user.rol.rol,
      phone: user.phone,
      img: user.avatar,
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
