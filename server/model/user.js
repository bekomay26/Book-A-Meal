'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    fullname: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.ENUM
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};