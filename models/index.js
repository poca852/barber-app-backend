// models
const UserModel = require('./usuario.js');
const Rolmodel = require('./rol.js');
const ServiceModel = require('./services.js');
const DateModel = require('./date.js');
const EmployeeModel = require('./employee.js');
const ProductsModel = require("./products.js")
const CategorieModel = require ("./categorie.js")
const PagoModel = require("./pago.js")

// relations rol - user
Rolmodel.hasMany(UserModel, {foreignKey: 'idRol'});
UserModel.belongsTo(Rolmodel, {foreignKey: 'idRol'});

// relation user - date
UserModel.hasOne(DateModel, {foreignKey: 'idUser'});
DateModel.belongsTo(UserModel);

//relation cita - service
DateModel.belongsToMany(ServiceModel, {through: 'ServiceDate'});
ServiceModel.belongsToMany(DateModel, {through: 'ServiceDate'});

//relation cita - employee
EmployeeModel.hasOne(DateModel, {foreignKey: 'idEmployee'});
DateModel.belongsTo(EmployeeModel);

//relation categorie - products
CategorieModel.hasMany(ProductsModel, {foreignKey: 'idCategorie'})
ProductsModel.belongsTo(CategorieModel, {foreignKey: 'idCategorie'})

//relation Pago - OrdenCompra
OrdenDeCompraModel.hasOne(PagoModel, {foreignKey: 'idOrdCompra'});
PagoModel.belongsTo(OrdenDeCompraModel);


// models exports 
module.exports = { 
  UserModel,
  Rolmodel,
  ServiceModel,
  DateModel,
  EmployeeModel,
  CategorieModel,
  ProductsModel,
  PagoModel
}