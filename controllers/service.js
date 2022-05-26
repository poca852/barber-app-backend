const { response, request } = require("express");
const {ServiceModel} = require('../models');

const addService = async(req = request, res = response) => {

    const {name, detail, price, time, img} = req.body;
    
    try {
        // insertamos en la base de datos el service
        const service = await ServiceModel.create({name, detail, price, time, img});

        res.json({
          ok: true,
          id: service.id,
          name: service.name,
          detail: service.detail,
          price: service.price,
          time: service.time,
          img: service.img
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

const getServices = async(req = request, res = response, next) => {
  const {name} = req.query;

  try {

    const services = await ServiceModel.findAll({
      attributes: ["name", "detail", "price", "time", "img", "id"]
    });

    if (name){

    //const service = services.find((s) => s.name.toLowerCase() === name.toLowerCase());
    const service = services.filter((s) => s.name.toLowerCase().includes(name.toLowerCase()));

    if (service.length>0){
    return res.status(200).json({
      ok: true,
      service
    })}

     return res.status(500).json({
        ok: false,
        msg: "Servicio no encontrado",
    })
  }

  res.status(200).json({
    ok: true,
    services
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

const getService = async(req = request, res = response, next) => {
  const {id} = req.params;

  try {

    const service = await ServiceModel.findByPk(id,{
      attributes: ["name", "detail", "price", "time", "img", "id"]
    });


  res.status(200).json({
    ok: true,
    service
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
  addService,
  getServices,
  getService

};
