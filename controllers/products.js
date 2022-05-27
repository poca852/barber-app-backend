const { response, request } = require("express");
const { ProductsModel, CategorieModel } = require("../models");

const addProduct = async (req = request, res = response) => {
  const { name, detail,stock, price, idCategorie, img } = req.body;

  try {

     // Consu :verifico que el nombre que queremos agregar no este en la base anteriormente
     const validateName =  await ProductsModel.findOne({
      where: {
        name : name
      }
    });
  
   // si el nombre ya existe entonces le mando una respuesta indicando que el servicio ya existe
   if(validateName){
    return res.status(400).json({
      ok: false,
      msg: `El producto ${name} ya existe`
    })
  }

    // insertamos en la base de datos el service
    const product = await ProductsModel.create({
      name,
      detail,
      stock,
      price,
      img,
      idCategorie,
    });

    res.json({
      ok: true,
      id: product.id,
      name: product.name,
      detail: product.detail,
      stock: product.stock,
      price: product.price,
      img: product.img,
      idCategorie: product.idCategorie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getProducts = async (req = request, res = response) => {

  const { name, state = true } = req.query;

  try {
    const products = await ProductsModel.findAll({
      where: {
        state
      },
      attributes: ["name", "stock", "price", "idCategorie", "img", "id", "detail"],
      include: {
        model: CategorieModel,
        attributes: ["categorie", "id"],
      },
    });

    if (name) {
      //const product = services.find((p) => p.name.toLowerCase() === name.toLowerCase());
      const product = products.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );

      if (product.length) {
        return res.status(200).json({
          ok: true,
          product,
        });
      }

      return res.status(500).json({
        ok: false,
        msg: "Producto no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      products,
    });
  } catch (error) {
    //next(error)
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getProduct = async (req = request, res = response, next) => {

  const { id } = req.params;

  try {
    const product = await ProductsModel.findByPk(id, {
      attributes: ["name","detail", "stock", "price", "idCategorie", "img", "id"]
    });

    res.status(200).json({
      ok: true,
      product,
    });
  } catch (error) {
    //next(error)
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const putProduct = async(req = request, res = response) => {

  // el id del producto lo extraemos de los params
  const { idProduct } = req.params;

  // se separa el state, idCategorie y el id por si me lo llegaran a mandar y guardo lo que si quiero guardar en data
  const {state, idCategorie, id,  ...data} = req.body;

  try {

    if(data.name){
      // verifico que el nombre que queremos actualizar este disponible
      const verificarNameProduct = await ProductsModel.findOne({
        where: {
          name: data.name
        }
      })
  
      // si el nombre ya existe entonces le mando una respuesta indicando que el producto ya existe
      if(verificarNameProduct){
        return res.status(400).json({
          ok: false,
          msg: `El producto ${data.name} ya existe`
        })
      }
    }

    
    await ProductsModel.update(data, {
      where: {
        id: idProduct
      }
    })

    res.status(201).json({
      ok: true,
      msg: 'Producto actualizado correctamente'
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
};

const deleteProduct = async(req = request, res = response) => {

  const { idProduct } = req.params;

  try {
    
    await ProductsModel.update({state: false}, {
      where: {
        id: idProduct
      }
    })

    res.status(200).json({
      ok: true,
      msg: 'El producto ha sido eliminado'
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  putProduct,
  deleteProduct
};
