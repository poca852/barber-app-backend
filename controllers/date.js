const { response, request } = require("express");
const {
  DateModel,
  ServiceModel,
  UserModel,
  EmployeeModel,
} = require("../models");


const nodemailer = require("nodemailer");

const addDate = async (req = request, res = response) => {
  const { idUser, idEmployee, date, service } = req.body;

  try {

  if (date){
   const controlDate= await DateModel.findOne({
     where:{date}})

     //console.log(controlDate)
   
  if (controlDate){  

      return res.status(500).json({
        ok: false,
        msg: `Fecha ${date} ya reservada`,
      });


   }
  
    //   // insertamos en la base de datos la cita
    const newDate = await DateModel.create({
      idUser,
      idEmployee,
      date,
    });

    const foundService = await ServiceModel.findAll({
      where: {
        name: service
          },
    });


    if (foundService.length){
    await newDate.addService(foundService);

    const foundUser = await UserModel.findByPk(idUser,{
      attributes: ["id", "name", "email"],
    });

    //----codigo mail

    const url = "https://barber-app-henry.herokuapp.com";
    
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
      html: contentHTML, // html body
    });


 res.status(200).json({
      ok: true,
      idDate: newDate.id,
      idUser: foundUser.id,
      time: foundService.time
    });}
  
    else {
    res.status(404).json({
      ok: false,
      msg: "Servicio no encontrado",
    });
  }

  }
} catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getDates = async (req = request, res = response, next) => {
  const { idDate, state = true, date } = req.query;

  try {
    const allDates = await DateModel.findAll({
      where: {
        state
      },
      include: [
        {
          model: ServiceModel,
          attributes: ["name", "time"],
          through: {
            attributes: [],
          },
        },
        {
          model: UserModel,
          attributes: ["name", "id", "email"],
        },
        {
          model: EmployeeModel,
        },
      ],
    });

    // console.log(allDates)

    if (idDate) {
      const foundDate = await DateModel.findByPk(idDate)
      console.log(foundDate)
  
      
      if (foundDate) {
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

     if (date) {
      const foundFecha = await DateModel.findAll({where:{date}})
      console.log(foundFecha)
  
      
      if (foundFecha) {
        return res.status(200).json({
          ok: true,
          foundFecha,
        });
      }

      return res.status(500).json({
        ok: false,
        msg: "Fecha no encontrada",
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

    const foundDatesEmployee = await DateModel.findAll({
      where: {
        idEmployee: id
      },
      include: [
        {
          model: ServiceModel,
          attributes: ["name", "time"],
          through: {
            attributes: [],
          },
        },]

    });

    if(!foundDatesEmployee){
      const foundDatesUser = await DateModel.findAll({
        where: {
          idUser: id
        },
        include: [
          {
            model: ServiceModel,
            attributes: ["name", "time"],
            through: {
              attributes: [],
            },
          },]
      });

      return res.json({
        ok: true,
        foundDatesUser
      })
    }

    res.json({
      ok: true,
      foundDatesEmployee
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


const dateFinished = async (req = request, res = response) => {
  const { id } = req.params;

  try {

    const dateFound = await DateModel.findByPk(id);
 

if (dateFound){
    const date = await dateFound.update({ finished: true });

    res.status(200).json({
      ok: true,
      date,
      msg: `cita ${id} terminada`,
    });
  } 


 res.status(500).json({
    ok: false,
    msg: `No existe la cita ${id}`,
  });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: `Hable con el administrador`,
    });
  }
};



module.exports = {
  addDate,
  getDates,
  getDate,
  deleteDate,
  dateFinished
};
