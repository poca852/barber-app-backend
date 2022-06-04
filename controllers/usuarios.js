const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const {
  UserModel,
  Rolmodel,
  DateModel,
  EmployeeModel,
  FavoriteModel,
} = require("../models");

const addUser = async (req = request, res = response) => {
  const { email, password, name, phone, avatar, idRol } = req.body;

  try {
    // encriptamos el password
    const hash = bcryptjs.hashSync(password, 10);

    // armamos el body
    const data = {
      email,
      password: hash,
      name,
      phone,
      avatar,
      idRol,
    };

    // insertamos en la base de datos el user
    const user = await UserModel.create(data);

    res.json({
      ok: true,
      name: user.name,
      id: user.id,
      email: user.email,
      phone: user.phone,
      rol: user.idRol,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const addRol = async (req = request, res = response) => {
  const { rol } = req.body;
  try {
    const newRol = await Rolmodel.create({ rol: rol });

    res.status(201).json({
      ok: true,
      newRol,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getUsers = async (req = request, res = response) => {
  try {
    const users = await UserModel.findAll({
      attributes: ["id", "name", "email"],
      include: [
        {
          model: Rolmodel,
          attributes: ["id", "rol"],
        },
        {
          model: DateModel,
          include: [
            {
              model: EmployeeModel,
            },
          ],
        },
        {
          model: FavoriteModel,
          attributes: {
            exclude: ["FavoriteUser"],
          },
        },
      ],
    });

    res.status(200).json({
      ok: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByPk(id, {
      attributes: ["id", "email", "name"],
    });

    res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, ...resto } = req.body;
  try {
    if (password) {
      resto.password = bcryptjs.hashSync(password, 10);
    }

    const user = await UserModel.update(resto, {
      where: {
        id,
      },
    });

    res.status(201).json({
      ok: true,
      msg: "Cambios realizados correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.update(
      { state: false },
      {
        where: {
          id,
        },
      }
    );

    res.status(201).json({
      ok: true,
      msg: "Usuario desactivado",
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
  addUser,
  getUsers,
  getUser,
  putUser,
  deleteUser,
  addRol,
};
