const { response, request } = require("express");
const { DateModel, ServiceModel } = require("../models");

const addDate = async (req = request, res = response) => {
  const { idUser, idEmployee, total, date, service } = req.body;
  //formato de date: "mm/dd/yyyy, 4:00:00 PM"

  try {
    //   // insertamos en la base de datos la cita
    const newDate = await DateModel.create({
      idUser,
      idEmployee,
      total,
      date,
    });

    const foundService = await ServiceModel.findAll({
      where: {
        name: service,
      },
    });
    await newDate.addService(foundService);

    res.json({
      ok: true,
      id: newDate.id,
      // idUser: newDate.idUser,
      //idEmployee: newDate.idEmployee,
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

const getDates = async (req = request, res = response, next) => {
  const { date } = req.query;

  try {
    const allDates = await DateModel.findAll({
      include: {
        model: ServiceModel,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    if (date) {
      const foundDate = allDates.filter((d) => {
        if (d.date === date) {
          return d;
        }
        return d.date.split(",")[0] === date;
      });

      if (foundDate.length) {
        return res.status(200).json({
          ok: true,
          foundDate,
        });
      }

      return res.status(500).json({
        ok: false,
        msg: "Cita no encontrada",
      });
    }

    res.status(200).json({
      ok: true,
      allDates,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

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
  getDates,
};
