const { response, request } = require("express");
const { CategorieModel, ProductsModel } = require('../models');

const addCategorie = async (req = request, res = response) => {

  const { categorie } = req.body;

  try {

    // insertamos en la base de datos el service
    const query = categorie.toLowerCase()
    const categoryModel = await CategorieModel.findOne({
      where: {
        categorie: query
      }
    })

    if(categoryModel){
      return res.status(400).json({
        ok: false,
        msg: `Ya exise la categoria ${query}`
      })
    }

    const newCategoria = await CategorieModel.create({categorie: query})


    res.json({
      ok: true,
      id: newCategoria.id,
      categorie: newCategoria.categorie,
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
        // where: {
        //   state: true
        // }
      }
    });

    if (categorie) {

      //const cat = services.find((c) => p.name.toLowerCase() === name.toLowerCase());
      const cat = categories.filter((c) => c.categorie.toLowerCase().includes(categorie.toLowerCase()));

      console.log(cat)
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

const patchCategories = async (req = request, res = response) => {

  // el id de la  categoria lo extraemos de los params
  const { idCategorie } = req.params;

  console.log(idCategorie)

  const { categorie } = req.body;

  try {

    const allCategories = await CategorieModel.findAll({
      attributes: ["categorie", "id"]
    })

    if (categorie) {
      // verifico que la categorie que queremos actualizar este disponible
      
    const verificarNameCategorie  = allCategories.filter((c) => c.categorie.toLowerCase().includes(categorie.toLowerCase()));
  



      // si el nombre ya existe entonces le mando una respuesta indicando que la categoria ya existe
      if (verificarNameCategorie.length) {
        return res.status(400).json({
          ok: false,
          msg: `La categoria ${categorie} ya existe`
        })
      }
    }


    await CategorieModel.update({categorie}, {
      where: {
        id: idCategorie
      }
    })

    const categoria = 
    await CategorieModel.findByPk(idCategorie, {
      attributes: ["categorie"]})

    res.status(200).json({
      ok: true,
      categoria
     
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
};



module.exports = {
  addCategorie,
  getCategories,
  patchCategories
};
