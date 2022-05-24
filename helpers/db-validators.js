const { UserModel, Rolmodel } = require("../models");

//  ================== VERIFICACIONES PARA EL MANEJO DE LOS USUARIOS ==========
const verficarEmail = async(email = '') => {
   const user = await UserModel.findOne({
      where: {
         email
      }
   });
   if(user){
      throw new Error(`Ya existe el email ${email}`)
   }
}

const verificarId = async(id = '') => {
   const user = await UserModel.findByPk(id)
   if(!user){
      throw new Error(`No existe el usuario con el id ${id}`)
   }
}

// para verificar si existe un rol antes de crearlo
const existeRol = async(rol = '') => {
   const rol = await Rolmodel.findOne({
      where: {
         rol
      }
   })

   if(rol){
      throw new Error(`El rol ${rol} ya existe`)
   }
}

// =================== VERIFICACIONES PARA EL LOGIN =================
const existeEmail = async(email = '') => {
   const user = await UserModel.findOne({
      where: {
         email
      }
   });
   if(!user){
      throw new Error(`El usuario ${email} no existe`)
   }
}

module.exports = {
   verficarEmail,
   existeRol,
   verificarId,
   existeEmail
}