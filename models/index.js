// models
const UserModel = require("./usuario.js");
const Rolmodel = require("./rol.js");
const ServiceModel = require("./services.js");
const DateModel = require("./date.js");
const EmployeeModel = require("./employee.js");
const ProductsModel = require("./products.js");
const CategorieModel = require("./categorie.js");
const PurchaseOrder = require("./purchaseOrder.js");
const PagoModel = require("./pago.js");
const FavoriteModel = require("./favorito.js");

// relations rol - user 1:n
Rolmodel.hasMany(UserModel, { foreignKey: "idRol" });
UserModel.belongsTo(Rolmodel, { foreignKey: "idRol" });

// relation user - date 1:1
UserModel.hasOne(DateModel, { foreignKey: "idUser" });
DateModel.belongsTo(UserModel, { foreignKey: "idUser" });

//relation cita - service n:m
DateModel.belongsToMany(ServiceModel, { through: "ServiceDate" });
ServiceModel.belongsToMany(DateModel, { through: "ServiceDate" });
//relation cita - service n:m
UserModel.belongsToMany(FavoriteModel, { through: "FavoriteUser" });
FavoriteModel.belongsToMany(UserModel, { through: "FavoriteUser" });

//relation cita - employee 1:1
EmployeeModel.hasMany(DateModel, { foreignKey: "idEmployee" });
DateModel.belongsTo(EmployeeModel, { foreignKey: "idEmployee" });

//relation categorie - products 1:n
CategorieModel.hasMany(ProductsModel, { foreignKey: "idCategorie" });
ProductsModel.belongsTo(CategorieModel, { foreignKey: "idCategorie" });

//relation user - purchaseOrder 1:1
UserModel.hasOne(PurchaseOrder, { foreignKey: "idUser" });
PurchaseOrder.belongsTo(UserModel);

//relation purchaseOrder - Products n:m
PurchaseOrder.belongsToMany(ProductsModel, { through: "PurchaseProducts" });
ProductsModel.belongsToMany(PurchaseOrder, { through: "PurchaseProducts" });

//relation Pago - purchaseOrder 1:1
PurchaseOrder.hasOne(PagoModel, {foreignKey: 'idPurchaseOrder'});
PagoModel.belongsTo(PurchaseOrder,);

// models exports
module.exports = {
  UserModel,
  Rolmodel,
  ServiceModel,
  DateModel,
  EmployeeModel,
  CategorieModel,
  ProductsModel,
  PagoModel,
  PurchaseOrder,
  FavoriteModel,
};
