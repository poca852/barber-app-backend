const { response, request } = require("express");
const {ServiceModel} = require('../models');

const addService = async(req = request, res = response) => {

    const {name, detail, price, time, img, state} = req.body;
    
    try {

    // Consu :verifico que el nombre que queremos agregar no este en la base anteriormente
    const validateName =  await ServiceModel.findOne({
      where: {
        name : name
      }
    });
  
   // si el nombre ya existe entonces le mando una respuesta indicando que el servicio ya existe
   if(validateName){
    return res.status(400).json({
      ok: false,
      msg: `El servicio ${name} ya existe`
    })
  }

  // insertamos en la base de datos el service
    const service = await ServiceModel.create({name, detail, price, time, img, state});
  

     return res.json({
          ok: true,
          id: service.id,
          name: service.name,
          detail: service.detail,
          price: service.price,
          time: service.time,
          img: service.img,
          state: service.state
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};




const getServices = async(req = request, res = response, next) => {
  const {name} = req.query;

  try {

    const services = await ServiceModel.findAll({
      attributes: ["name", "detail", "price", "time", "img", "id", "state"]
    });

    if (name){

    
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
      attributes: ["name", "detail", "price", "time", "img", "id", "state"]
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


const putService = async(req = request, res = response) => {
  const {id} = req.params;
  
  const { state, ...data} = req.body;
  try {
 
  // verifico que el nombre que queremos actualizar este disponible
  const validateName =  await ServiceModel.findOne({
      where: {
        name : data.name
      }
    });

   // si el nombre ya existe entonces le mando una respuesta indicando que el servicio ya existe
   if(validateName){
    return res.status(400).json({
      ok: false,
      msg: `El servicio ${data.name} ya existe`
    })
  }
  

    await ServiceModel.update(data, {
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

const deleteService = async(req = request, res = response) => {
  const {id} = req.params;
  try {
     await ServiceModel.update({state: false}, {
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

module.exports = {
  addService,
  getServices,
  getService,
  putService,
  deleteService
  

};
