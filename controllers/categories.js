const { response, request } = require("express");
const { CategorieModel, ProductsModel} = require('../models');

const addCategorie = async(req = request, res = response) => {

    const {categorie} = req.body;
    
    try {
        // insertamos en la base de datos el service
        const categories = await CategorieModel.create({categorie});

        res.json({
          ok: true,
          id: categories.id,
          categorie: categories.categorie,
        })

       

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};




const getCategories = async(req = request, res = response, next) => {
  const {categorie} = req.query;

  try {

    const categories = await CategorieModel.findAll({
      attributes: ["categorie", "id"],
      include: {
        model: ProductsModel
      }
    });

    if (categorie){

    //const cat = services.find((c) => p.name.toLowerCase() === name.toLowerCase());
    const cat = categories.filter((c) => c.categorie.toLowerCase().includes(categorie.toLowerCase()));

    if (cat.length){
    return res.status(200).json({
      ok: true,
      cat
    })}

     return res.status(500).json({
        ok: false,
        msg: "Categorie no encontrado",
    })
  }

  res.status(200).json({
    ok: true,
    categories
  })

}catch (error) {
      //next(error)
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};


/*
const putService = async(req = request, res = response) => {
  const {id} = req.params;
  const {} = req.body;
  try {
    if(password){
      resto.password = bcryptjs.hashSync(password, 10)
    }

    const user = await UserModel.update(resto, {
      where: {
        id
      }
    });
    
    res.status(201).json({
      ok: true,
      msg: 'Cambios realizados correctamente'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteUser = async(req = request, res = response) => {
  const {id} = req.params;
  try {
    const user = await UserModel.update({state: false}, {
      where: {
        id
      }
    })

    res.status(201).json({
      ok: true,
      msg: 'Usuario desactivado'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
*/
module.exports = {
addCategorie,
getCategories,



};
