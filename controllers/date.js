const { response, request } = require("express");
const {
  DateModel,
  ServiceModel,
  UserModel,
  EmployeeModel,
} = require("../models");
const nodemailer = require("nodemailer");

const addDate = async (req = request, res = response) => {
  const { idUser, idEmployee, date, service, text } = req.body;
  //formato de date: "mm/dd/yyyy, 4:00:00 PM"

  try {
    //   // insertamos en la base de datos la cita
    const newDate = await DateModel.create({
      idUser,
      idEmployee,
      date,
    });

    const foundService = await ServiceModel.findAll({
      where: {
        name: service,
      },
    });
    await newDate.addService(foundService);
    const foundUser = await UserModel.findByPk(idUser);
    console.log("-------", foundUser);
    console.log("-------", foundUser.dataValues);
    console.log("------- name", foundUser.dataValues.name);

    //----codigo mail

    const url = "https://barber-app-henry.herokuapp.com/profile";
    
    contentHTML = `<h1>Confirmación reserva Cita</h1>
        <ul>

        <p style= "color: red"> Tu reserva se ha realizado con exito!! Para mas información clickea aqui 👇: </p>
        <a href="${url}"> ${url}</a>

            <li>Nombre : ${foundUser.dataValues.name}</li>
            <li>Mail : ${foundUser.dataValues.email}</li>
            <li>Servicio :${service}</li>
            <li>Fecha:${date}</li>
            
        </ul>
        <p></p>
        `;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "barberapphenry@gmail.com", // generated ethereal user
        pass: "kxztvsoaqzezigsc", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Confirmación Cita 👍" <barberapphenry@gmail.com>', // sender address
      to: `${foundUser.dataValues.email}`, // list of receivers
      subject: `Hello ${foundUser.dataValues.name} ✔`, // Subject line
      // text: "Hello world?", // plain text body
      html: contentHTML, // html body
    });
    console.log("Mensaje enviado", info.messageId);
    //----fin codigo mail

    res.json({
      ok: true,
      id: newDate.id,
      // idUser: newDate.idUser,
      //idEmployee: newDate.idEmployee,
      total: newDate.total,
      date: newDate.date,
      usuario: foundUser,
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

  console.log("dio click en getDates, con params: ", date);
  try {
    const allDates = await DateModel.findAll({
      include: [
        {
          model: ServiceModel,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: UserModel,
        },
        {
          model: EmployeeModel,
        },
      ],
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

//Se mandan las citas dependiendo el usuario en su perfil:

const getDate = async(req = request, res = response) => {
  const {id} = req.params

  try {
    const foundDates = await DateModel.findAll({
      where: {
        idUser: id
      }
    });

    res.json({
      ok: true,
      foundDates
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
}

const deleteDate = async (req = request, res = response) => {
  const { id } = req.params;
  // console.log("entro funcion delete date ide es:", idDate);
  // const dateFound = await DateModel.findByPk(idDate);
  // console.log("esta es la date encontrada", dateFound);
  try {
    const dateFound = await DateModel.findByPk(id);
    const date = await dateFound.update({ state: false });
    // const date = await DateModel.update(
    //   {
    //     state: false,
    //   },
    //   {
    //     where: {
    //       id,
    //     },
    //   }
    // );

    res.status(200).json({
      ok: true,
      msg: `cita ${date.id} cancelada`,
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
  addDate,
  getDates,
  getDate,
  deleteDate,
};
