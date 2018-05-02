module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    dateTimeOrdered: DataTypes.DATE,
    est_readyTime: DataTypes.INTEGER,
    dateTimeDelivered: DataTypes.DATE,
    totalPrice: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['goesWith', 'onTop'],
    },
    address: DataTypes.STRING,
  }, {});
  Order.associate = (models) => {
    Order.belongsToMany(models.Meal, {
      foreignKey: 'mealId',
      as: 'meals',
      through: 'MenuMeal',
    });
  };
  return Order;
};
