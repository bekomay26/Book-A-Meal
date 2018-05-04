module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['Caterer', 'Customer'],
    },
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Order, {
      foreignKey: 'createdById',
      as: 'orders',
    });
    User.hasMany(models.Order, {
      foreignKey: 'cateredById',
      as: 'orders1',
    });
  };
  return User;
};
