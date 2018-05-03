module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    // dateTimeOrdered: DataTypes.DATE,
    est_readyTime: DataTypes.INTEGER,
    dateTimeDelivered: DataTypes.DATE,
    totalPrice: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['Cancelled', 'Completed', 'Pending'],
    },
    address: DataTypes.STRING,
  }, {});
  Order.associate = (models) => {
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      onDelete: 'CASCADE',
    });
    Order.belongsTo(models.User, {
      foreignKey: 'createdById',
      onDelete: 'CASCADE',
    });
    Order.belongsTo(models.User, {
      foreignKey: 'cateredById',
      onDelete: 'CASCADE',
    });
  };
  return Order;
};
