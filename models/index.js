// models
const UserModel = require('./usuario');
const Rolmodel = require('./rol');

// relations
Rolmodel.hasOne(UserModel, {foreignKey: 'id'});
UserModel.belongsTo(Rolmodel);

// models exports 
module.exports = { 
  UserModel,
  Rolmodel
}