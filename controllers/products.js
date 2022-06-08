const { response, request } = require("express");
const { ProductsModel, CategorieModel } = require("../models");

const addProduct = async (req = request, res = response) => {

  const { name, detail, stock, price, categoria, img } = req.body;

  try {

    // busco la categoria para asignar un idCategorie
    const cat = await CategorieModel.findOne({
      where: {
        categorie: categoria.toLowerCase()
      }
    })

    if (!cat) {
      return res.status(400).json({
        ok: false,
        msg: `No existe la categoria ${categoria}`
      })
    }

    // Consu :verifico que el nombre que queremos agregar no este en la base anteriormente
    const validateName = await ProductsModel.findOne({
      where: {
        name: name
      }
    });

    // si el nombre ya existe entonces le mando una respuesta indicando que el servicio ya existe
    if (validateName) {
      return res.status(400).json({
        ok: false,
        msg: `El producto ${name} ya existe`
      })
    }

    // insertamos en la base de datos el producto
    const product = await ProductsModel.create({
      name,
      detail,
      stock,
      price,
      img,
      idCategorie: cat.id,
    });

    res.json({
      ok: true,
      producto: {
        name: product.name,
        stock: product.stock,
        price: product.price,
        idCategorie: product.idCategorie,
        img: product.img,
        id: product.id,
        detail: product.detail,
        category: {
          categorie: categoria
        }
      }
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

  const { name, state = true, all = false } = req.query;

  try {

    let products

    if(all){
      products = await ProductsModel.findAll({
        attributes: ["name", "stock", "price", "idCategorie", "img", "id", "detail", 'state'],
        include: {
          model: CategorieModel,
          attributes: ["categorie", "id"],
        },
      });
    }else{
      products = await ProductsModel.findAll({
        where: {
          state
        },
        attributes: ["name", "stock", "price", "idCategorie", "img", "id", "detail", 'state'],
        include: {
          model: CategorieModel,
          attributes: ["categorie", "id"],
        },
      });
    }


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
      attributes: ["name", "detail", "stock", "price", "idCategorie", "img", "id"],
      include: {
        model: CategorieModel,
        attributes: ["categorie", "id"],
      }
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

const putProduct = async (req = request, res = response) => {

  // el id del producto lo extraemos de los params
  const { idProduct } = req.params;

  // se separa el state, idCategorie y el id por si me lo llegaran a mandar y guardo lo que si quiero guardar en data
  const { idCategorie, id, ...data } = req.body;

  try {

    if (data.name) {
      // verifico que el nombre que queremos actualizar este disponible
      const verificarNameProduct = await ProductsModel.findOne({
        where: {
          name: data.name
        }
      })

      // si el nombre ya existe entonces le mando una respuesta indicando que el producto ya existe
      if (verificarNameProduct) {
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

    const producto = await ProductsModel.findByPk(idProduct, {
      include: {
        model: CategorieModel,
        attributes: ["categorie", "id"],
      },
    })

    res.status(200).json({
      ok: true,
      producto
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
};

const deleteProduct = async(req, res) => {
  const { idProduct } = req.params;
  await ProductsModel.update({ state: false }, {
    where: {
      id: idProduct
    }
  })

  const producto = await ProductsModel.findByPk(idProduct, {
    attributes: ["name", "stock", "price", "idCategorie", "img", "id", "detail", 'state'],
    include: {
      model: CategorieModel,
      attributes: ["categorie", "id"],
    },
  });

  res.status(200).json({
    ok: true,
    producto
  })

}

const patchProducto = async(req, res) => {
  const { idProduct } = req.params;
  await ProductsModel.update({ state: true }, {
    where: {
      id: idProduct
    }
  })

  const producto = await ProductsModel.findByPk(idProduct, {
    attributes: ["name", "stock", "price", "idCategorie", "img", "id", "detail", 'state'],
    include: {
      model: CategorieModel,
      attributes: ["categorie", "id"],
    },
  });

  res.status(200).json({
    ok: true,
    producto
  })

}

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  putProduct,
  deleteProduct,
  patchProducto
};
