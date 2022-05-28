// models
const UserModel = require('./usuario.js');
const Rolmodel = require('./rol.js');
const ServiceModel = require('./services.js');
const DateModel = require('./date.js');
const EmployeeModel = require('./employee.js');
const ProductsModel = require("./products.js")
const CategorieModel = require ("./categorie.js")
const PurchaseOrder = require('./purchaseOrder.js')

// relations rol - user 1:n
Rolmodel.hasMany(UserModel, {foreignKey: 'idRol'});
UserModel.belongsTo(Rolmodel, {foreignKey: 'idRol'});

// relation user - date 1:1
UserModel.hasOne(DateModel, {foreignKey: 'idUser'});
DateModel.belongsTo(UserModel);

//relation cita - service n:m
DateModel.belongsToMany(ServiceModel, {through: 'ServiceDate'});
ServiceModel.belongsToMany(DateModel, {through: 'ServiceDate'});

//relation cita - employee 1:1
EmployeeModel.hasOne(DateModel, {foreignKey: 'idEmployee'});
DateModel.belongsTo(EmployeeModel);

//relation categorie - products 1:n
CategorieModel.hasMany(ProductsModel, {foreignKey: 'idCategorie'})
ProductsModel.belongsTo(CategorieModel, {foreignKey: 'idCategorie'})

//relation user - purchaseOrder 1:1
UserModel.hasOne(PurchaseOrder, {foreignKey: 'idUser'});
PurchaseOrder.belongsTo(UserModel);

//relation purchaseOrder - Products n:m
PurchaseOrder.belongsToMany(ProductsModel, {through: 'PurchaseProducts'});
ProductsModel.belongsToMany(PurchaseOrder, {through: 'PurchaseProducts'});

// models exports 
module.exports = { 
  UserModel,
  Rolmodel,
  ServiceModel,
  DateModel,
  EmployeeModel,
  CategorieModel,
  ProductsModel,
  PurchaseOrder
}