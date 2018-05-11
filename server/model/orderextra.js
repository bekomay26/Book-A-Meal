module.exports = (sequelize, DataTypes) => {
  const OrderExtra = sequelize.define('OrderExtra', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
      },
    },
    extraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Extras',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return OrderExtra;
};
