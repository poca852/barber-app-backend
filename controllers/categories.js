const { response, request } = require("express");
const { CategorieModel, ProductsModel } = require('../models');

const addCategorie = async (req = request, res = response) => {

  const { categorie } = req.body;

  try {
    // insertamos en la base de datos el service
    const query = categorie.toLowerCase()

    
    const [categories, iscreate] = 
    
    await CategorieModel.findOrCreate({
      where :{categorie:query }});

if (iscreate){
  res.status(500).json({
    ok: false,
    msg: `Categoria ${categorie} ya existe`})
}
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




const getCategories = async (req = request, res = response, next) => {

  const { categorie } = req.query;

  try {

    const categories = await CategorieModel.findAll({
      attributes: ["categorie", "id"],
      include: {
        model: ProductsModel,
        where: {
          state: true
        }
      }
    });

    if (categorie) {

      //const cat = services.find((c) => p.name.toLowerCase() === name.toLowerCase());
      const cat = categories.filter((c) => c.categorie.toLowerCase().includes(categorie.toLowerCase()));

      if (cat.length) {
        return res.status(200).json({
          ok: true,
          cat
        })
      }

      return res.status(500).json({
        ok: false,
        msg: "Categorie no encontrado",
      })
    }

    res.status(200).json({
      ok: true,
      categories
    })

  } catch (error) {
    //next(error)
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  addCategorie,
  getCategories,
};
