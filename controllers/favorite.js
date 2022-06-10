const { response, request } = require("express");
const { UserModel, ProductsModel, FavoriteModel } = require("../models");
//-------------------------------addFavorite -------------------
const addFavorite = async (req = request, res = response) => {
  const { idUser, idProduct } = req.body;
  try {
    const foundUser = await UserModel.findByPk(idUser,{
    });
    // const foundProduct = await ProductsModel.findByPk(idProduct);
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
    });
    //-----
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
//-------------------------------getFavorite -------------------
const getFavorite = async (req = request, res = response, next) => {
 const {idUser} = req.params
 
  try {
    const allFavorites = await FavoriteModel.findAll({
      where:{
        idUser
      }
    });

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

    const eliminaFavorite = await FavoriteModel.destroy({
      where: {
        idUser,
        idProduct
      },
    });

    if(eliminaFavorite === 1){
      return res.status(200).json({
        ok: true,
        msg: `Producto con id ${idProduct} borrado de favorito con exito `,
      });
    }
    res.status(500).json({
      ok: true,
      msg: `Producto con id ${idProduct} no fue borrado de favorito con exito `,
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
  deleteFavorite
};
