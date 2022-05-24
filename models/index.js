// models
const UserModel = require('./usuario');
const Rolmodel = require('./rol');
const ServiceModel = require('./services');

// relations
Rolmodel.hasOne(UserModel, {foreignKey: 'id'});
UserModel.belongsTo(Rolmodel);

// models exports 
module.exports = { 
  UserModel,
  Rolmodel,
  ServiceModel
}