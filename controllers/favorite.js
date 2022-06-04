const { response, request } = require("express");
const {
  DateModel,
  ServiceModel,
  UserModel,
  EmployeeModel,
  ProductsModel,
  FavoriteModel,
} = require("../models");
const nodemailer = require("nodemailer");
//-------------------------------addFavorite -------------------
const addFavorite = async (req = request, res = response) => {
  const { idUser, idProduct } = req.body;
  try {
    const foundUser = await UserModel.findByPk(idUser);
    const foundProduct = await ProductsModel.findByPk(idProduct);
    const FavoriteModelfoun = await FavoriteModel.findOne({
      where: { idProduct: idProduct },
      include: [
        {
          model: UserModel,
          where: { id: idUser },
        },
      ],
    });
    console.log("encontrado", FavoriteModelfoun);
    let favoritook1 = FavoriteModelfoun;
    if (favoritook1 !== null) {
      console.log("producto", favoritook1.dataValues.idProduct);
      console.log("usuario", favoritook1.dataValues.idUser);
      if (favoritook1.dataValues.idProduct && favoritook1.dataValues.idUser) {
        return res.json({
          ok: true,
          msj: "ya existe este produto en este usuario",
        });
      }
    }
    const newFavorite = await FavoriteModel.create({
      idProduct,
      idUser: idUser,
    });
    await foundUser.addFavorite(newFavorite);

    res.json({
      ok: true,
      foundUser: foundUser,
    });
    //-----
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

  //-----
  // // console.log(foundProduct);
  // if (!foundProduct || foundProduct === null) {
  //   return console.log("no hay nada");
  // } else {
  // }
  //   res.json({
  //     ok: false,
  //     msj: "no hay producto",
  //   });
  // }
};
//-------------------------------getFavorite -------------------
const getFavorite = async (req = request, res = response, next) => {
  const { date } = req.query;
  console.log("dio click en getDates, con params: ", date);
  try {
    const allFavorites = await FavoriteModel.findAll();
    res.status(200).json({
      ok: true,
      allFavorites,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteFavorite = async (req = request, res = response) => {
  try {
    const { idUser, idProduct } = req.body;
    const foundUser = await UserModel.findByPk(idUser);
    const foundProduct = await ProductsModel.findByPk(idProduct);
    //-----
    const eliminaFavorite = await FavoriteModel.findOne({
      where: {
        idProduct: idProduct,
      },
    });
    // console.log(foundUser.__proto__);
    await foundUser.removeFavorite(eliminaFavorite);

    //-----

    res.status(200).json({
      ok: true,
      msg: `producto con id ${idProduct} borrado de favorito `,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const deleteFavoriteParams = async (req = request, res = response) => {
  try {
    const { idUser, idProduct } = req.params;
    const foundUser = await UserModel.findByPk(idUser);
    const foundProduct = await ProductsModel.findByPk(idProduct);
    //-----
    const eliminaFavorite = await FavoriteModel.findOne({
      where: {
        idProduct: idProduct,
      },
    });
    // console.log(foundUser.__proto__);
    await foundUser.removeFavorite(eliminaFavorite);

    //-----

    res.status(200).json({
      ok: true,
      msg: `producto con id ${idProduct} borrado de favorito `,
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
  addFavorite,
  getFavorite,
  deleteFavorite,
  deleteFavoriteParams,
};
