const { request, response } = require('express');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL)
const { UserModel, ProductsModel, CategorieModel, ServiceModel } = require('../models');

const uploadImg = async (req = request, res = response) => {
  const { coleccion, id } = req.params;
  try {

    let modelo;

    switch (coleccion) {
      case 'usuario':
        modelo = await UserModel.findByPk(id);
        if (!modelo) {
          return res.status(400).json({
            ok: false,
            msg: `No existe un usuario con el id ${id}`
          })
        }
        break;

      case 'productos':
        modelo = await ProductsModel.findByPk(id, {
          attributes: ["name", "stock", "price", "idCategorie", "img", "id", "detail", 'state'],
          include: {
            model: CategorieModel,
            attributes: ["categorie", "id"],
          },
        });
        if (!modelo) {
          return res.status(400).json({
            ok: false,
            msg: `No existe un producto con el id ${id}`
          })
        }
        break;

      case 'servicios':
        modelo = await ServiceModel.findByPk(id, {
          attributes: ['name', 'detail', 'price', 'time', 'img', 'id', 'state']
        })
        if(!modelo){
          return res.status(400).json({
            ok: false,
            msg: `No existe un servicio con el id ${id}`
          })
        }
      break;

      default:
        return res.status(500).json({
          msg: 'Hable con el administrador'
        })
    }

    if (modelo.img) {
      const nombreArr = modelo.img.split('/');
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split('.');
      cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    await modelo.update({ img: secure_url })

    res.status(201).json({
      ok: true,
      modelo
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  uploadImg
}