// models
const UserModel = require('./usuario.js');
const Rolmodel = require('./rol.js');
const ServiceModel = require('./services.js');
const DateModel = require('./date.js');
const EmployeeModel = require('./employee.js');

// relations rol - user
Rolmodel.hasOne(UserModel, {foreignKey: 'idRol'});
UserModel.belongsTo(Rolmodel);

// relation user - date
UserModel.hasOne(DateModel, {foreignKey: 'idUser'});
DateModel.belongsTo(UserModel);

//relation cita - service
DateModel.belongsToMany(ServiceModel, {through: 'ServiceDate'});
ServiceModel.belongsToMany(DateModel, {through: 'ServiceDate'});

//relation cita - employee
EmployeeModel.hasOne(DateModel, {foreignKey: 'idEmployee'});
DateModel.belongsTo(EmployeeModel);

// models exports 
module.exports = { 
  UserModel,
  Rolmodel,
  ServiceModel,
  DateModel,
  EmployeeModel
}