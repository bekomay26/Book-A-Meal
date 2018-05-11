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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    address: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {});
  Order.associate = (models) => {
    Order.belongsToMany(models.Extra, {
      foreignKey: 'orderId',
      otherKey: 'extraId',
      onDelete: 'CASCADE',
      as: 'extras',
      through: 'OrderExtra',
    });
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
