const { response, request } = require("express");
const {ProductsModel, CategorieModel} = require('../models');

const addProduct = async(req = request, res = response) => {

    const {name,stock, price, idCategorie, img} = req.body;
    
    try {
        // insertamos en la base de datos el service
        const product = await ProductsModel.create({name, stock, price, img, idCategorie});
        

        res.json({
          ok: true,
          id: product.id,
          name: product.name,
          stock: product.stock,
          price: product.price,
          img: product.img,
          idCategorie: product.idCategorie
        })

       

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

/*
const addRol = async(req = request, res = response) => {
  const {rol} = req.body;
  try {
    const newRol = await Rolmodel.create({rol: rol});

    res.status(201).json({
      ok: true,
      newRol
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}
*/

const getProducts = async(req = request, res = response, next) => {
  const {name} = req.query;

  try {

    const products = await ProductsModel.findAll({
      attributes: ["name", "stock", "price", "idCategorie", "img", "id"],
      include: {
        model: CategorieModel,
        attributes: ['categorie', 'id']
      }
    });

    if (name){

    //const product = services.find((p) => p.name.toLowerCase() === name.toLowerCase());
    const product = products.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));

    if (product.length){
    return res.status(200).json({
      ok: true,
      product
    })}

     return res.status(500).json({
        ok: false,
        msg: "Producto no encontrado",
    })
  }

  res.status(200).json({
    ok: true,
    products
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

const getProduct = async(req = request, res = response, next) => {
  const {id} = req.params;

  try {

    const product = await ProductsModel.findByPk(id,{
      attributes: ["name", "stock", "price", "idCategorie", "img", "id"]
    });


  res.status(200).json({
    ok: true,
    product
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
addProduct,
getProducts,
getProduct


};
