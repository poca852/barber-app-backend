const { UserModel, Rolmodel,DateModel, CategorieModel, ProductsModel, EmployeeModel } = require("../models");

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
   const UserRol = await Rolmodel.findOne({
      where: {
         rol
      }
   })

   if(UserRol){
      throw new Error(`El rol ${rol} ya existe`)
   }
}

// esta funcion verifica que el rol exista a la hora de crear un usuario
const verificarRol = async(rol = '') => {
   const userRol = await Rolmodel.findByPk(rol);
   if(!userRol){
      throw new Error(`El rol ${rol} no existe en la db`)
   }
}

// =================== VERIFICACIONES PARA CITAS =================
const checkDates = async(date) =>{
   const allDates = await DateModel.findAll()
   if (date) {
      const foundDate = allDates.filter((d) =>{
        return d.date === date
      });

      if(foundDate.length){
         throw new Error(`La cita en esta fecha ${date} no esta disponible`);
      }
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

// =================== validaciones para products ====================
// david: esta funcion veriica que la categoria exista
const verficarCategoria = async(categorie = '') => {
   const categorieModel = await CategorieModel.findByPk(categorie)
   if(!categorieModel){
      throw new Error(`La categoria ${categorie} no existe`)
   }
}

// david: esta funcion verifica que el producto exista
const verificarProduct = async(idProduct = '') => {
   const productModel = await ProductsModel.findByPk(idProduct);
   if(!productModel){
      throw new Error(`El producto con el id ${idProduct} no existe`)
   }
}

// ================== VALIDACIONES PARA EMPLOYEE============================
const existeEmploye = async(employee = '') => {
   const employeeModel = await EmployeeModel.findOne({
      where: {
         name: employee
      }
   })

   if(employeeModel){
      throw new Error(`El empleado ${employee} ya existe`)
   }
}

const existeEmployeById = async(idEmploye = '') => {
   const employeModel = await EmployeeModel.findByPk(idEmploye);
   if(!employeModel) {
      throw new Error(`El empleado con el id ${idEmploye} no existe`);
   }
}

module.exports = {
   verficarEmail,
   existeRol,
   verificarRol,
   verificarId,
   existeEmail,
   verficarCategoria,
   verificarProduct,
   checkDates,
   existeEmploye,
   existeEmployeById
}