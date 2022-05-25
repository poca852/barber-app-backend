const { response, request } = require("express");
const { DateModel, ProductsModel } = require("../models");

const addDate = async (req = request, res = response) => {
  const { idUser, idEmployee, total, date } = req.body;
  console.log(total, date);
  try {
    //   // insertamos en la base de datos el service
    const newDate = await DateModel.create({ total, date });
    res.json({
      ok: true,
      // id: newDate.id,
      // idUser: newDate.idUser,
      // idEmployee: newDate.idEmployee,
      total: newDate.total,

      date: newDate.date,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

// const getDate = async (req = request, res = response, next) => {
//   const { categorie } = req.query;

//   try {
//     const categories = await CategorieModel.findAll({
//       attributes: ["categorie", "id"],
//       include: {
//         model: ProductsModel,
//       },
//     });

//     if (categorie) {
//       //const cat = services.find((c) => p.name.toLowerCase() === name.toLowerCase());
//       const cat = categories.filter((c) =>
//         c.categorie.toLowerCase().includes(categorie.toLowerCase())
//       );

//       if (cat.length) {
//         return res.status(200).json({
//           ok: true,
//           cat,
//         });
//       }

//       return res.status(500).json({
//         ok: false,
//         msg: "Categorie no encontrado",
//       });
//     }

//     res.status(200).json({
//       ok: true,
//       categories,
//     });
//   } catch (error) {
//     //next(error)
//     console.log(error);
//     res.status(500).json({
//       ok: false,
//       msg: "Hable con el administrador",
//     });
//   }
// };
// const getDates = async (req = request, res = response, next) => {
//   const { categorie } = req.query;

//   try {
//     const categories = await CategorieModel.findAll({
//       attributes: ["categorie", "id"],
//       include: {
//         model: ProductsModel,
//       },
//     });

//     if (categorie) {
//       //const cat = services.find((c) => p.name.toLowerCase() === name.toLowerCase());
//       const cat = categories.filter((c) =>
//         c.categorie.toLowerCase().includes(categorie.toLowerCase())
//       );

//       if (cat.length) {
//         return res.status(200).json({
//           ok: true,
//           cat,
//         });
//       }

//       return res.status(500).json({
//         ok: false,
//         msg: "Categorie no encontrado",
//       });
//     }

//     res.status(200).json({
//       ok: true,
//       categories,
//     });
//   } catch (error) {
//     //next(error)
//     console.log(error);
//     res.status(500).json({
//       ok: false,
//       msg: "Hable con el administrador",
//     });
//   }
// };

/*
const deleteDate = async(req = request, res = response) => {
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
  addDate,
  // getDate,
  // getDates,
};
