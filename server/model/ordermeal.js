
module.exports = (sequelize, DataTypes) => {
  const OrderMeal = sequelize.define('OrderMeal', {
    orderId: DataTypes.INTEGER,
    mealId: DataTypes.INTEGER,
  }, {});
  OrderMeal.associate = function(models) {
    // associations can be defined here
  };
  return OrderMeal;
};
