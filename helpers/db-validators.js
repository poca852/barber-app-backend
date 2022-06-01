const {
  UserModel,
  Rolmodel,
  DateModel,
  CategorieModel,
  ProductsModel,
  EmployeeModel,
  ServiceModel,
} = require("../models");

//  ================== VERIFICACIONES PARA EL MANEJO DE LOS USUARIOS ==========
const verficarEmail = async (email = "") => {
  const user = await UserModel.findOne({
    where: {
      email,
    },
  });
  if (user) {
    throw new Error(`Ya existe el email ${email}`);
  }
};

const verificarId = async (id = "") => {
  const user = await UserModel.findByPk(id);
  if (!user) {
    throw new Error(`No existe el usuario con el id ${id}`);
  }
};

// para verificar si existe un rol antes de crearlo
const existeRol = async (rol = "") => {
  const UserRol = await Rolmodel.findOne({
    where: {
      rol,
    },
  });

  if (UserRol) {
    throw new Error(`El rol ${rol} ya existe`);
  }
};

// esta funcion verifica que el rol exista a la hora de crear un usuario
const verificarRol = async (rol = "") => {
  const userRol = await Rolmodel.findByPk(rol);
  if (!userRol) {
    throw new Error(`El rol ${rol} no existe en la db`);
  }
};

// =================== VERIFICACIONES PARA CITAS =================
const checkDates = async (date) => {
  const allDates = await DateModel.findAll();
  if (date) {
    const foundDate = allDates.filter((d) => {
      return d.date === date;
    });

    if (foundDate.length) {
      throw new Error(`La cita en esta fecha ${date} no esta disponible`);
    }
  }
};

const verificarCitaId = async (id = "") => {
  const cita = await DateModel.findByPk(id);
  if (!cita) {
    throw new Error(`No existe el usuario con el id ${id}`);
  }
};

// =================== VERIFICACIONES PARA EL LOGIN =================
const existeEmail = async (email = "") => {
  const user = await UserModel.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error(`El usuario ${email} no existe`);
  }
};

// =================== validaciones para products ====================
// david: esta funcion verifica que la categoria exista
const verficarCategoria = async (categorie = "") => {
  const categorieModel = await CategorieModel.findByPk(categorie);
  if (!categorieModel) {
    throw new Error(`La categoria ${categorie} no existe`);
  }
};

// david: esta funcion verifica que el producto exista
const verificarProduct = async (idProduct = "") => {
  const productModel = await ProductsModel.findByPk(idProduct);
  if (!productModel) {
    throw new Error(`El producto con el id ${idProduct} no existe`);
  }
};

// ================== VALIDACIONES PARA EMPLOYEE============================
const existeEmploye = async (employee = "") => {
  const employeeModel = await EmployeeModel.findOne({
    where: {
      name: employee,
    },
  });

  if (employeeModel) {
    throw new Error(`El empleado ${employee} ya existe`);
  }
};

const existeEmployeById = async (idEmploye = "") => {
  const employeModel = await EmployeeModel.findByPk(idEmploye);
  if (!employeModel) {
    throw new Error(`El empleado con el id ${idEmploye} no existe`);
  }
};

//  ================== VERIFICACIONES PARA EL MANEJO DE LOS SERVICIOS ==========

// consu: esta funcion verifica que el servicio exista atraves del ID

const verificarServicio = async (id = "") => {
  const serviceModel = await ServiceModel.findByPk(id);
  if (!serviceModel) {
    throw new Error(`El servicio con el id ${id} no existe`);
  }
};

// consu: esta funcion verifica que el name no este repetido

const verificarNameServicio = async(name = '') => {
   const serviceNameModel = await ServiceModel.findOne({where: {name:name}});
   if(!serviceNameModel){
      throw new Error(`El servicio con el id ${name} no existe`)
   }
}

// =================== VERIFICACIONES PARA EL STOCK EN PURCHASEORDER =================

const checkStock = async(cart) => {

   let Stock = {};
   for(let i = 0; i < cart.length; i++){
      foundProduct = await ProductsModel.findOne({where: {id: cart[i].idProduct}});
      
      if((foundProduct.stock - cart[i].quantity) < 0){
         throw new Error(`El stock del producto ${foundProduct.name} no es suficiente para la cantidad ingresada`)
      }
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
   existeEmployeById,
   verificarServicio,
   verificarNameServicio,
   checkStock,
   verificarCitaId
}
