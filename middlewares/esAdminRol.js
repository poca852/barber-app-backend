const {request, response} = require('express');
const {Rolmodel} = require('../models')

const esAdminRol = async(req = request, res = response, next) => {

   try {
      const {user} = req;
   
      const rolModel = await Rolmodel.findByPk(user.idRol);

      if(rolModel.rol !== 'ADMIN'){

         return res.status(401).json({
            ok: false,
            msg: 'No eres admin'
         })
      }

      next();
      
   } catch (error) {
      console.log(error)
   }

}

module.exports = esAdminRol