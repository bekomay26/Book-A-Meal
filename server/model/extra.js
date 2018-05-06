module.exports = (sequelize, DataTypes) => {
  const Extra = sequelize.define('Extra', {
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: {
      type: DataTypes.ENUM,
      values: ['GoesWith', 'OnTop'],
    },
  }, {});
  Extra.associate = (models) => {
    Extra.belongsToMany(models.Meal, {
      foreignKey: 'extraId',
      otherKey: 'mealId',
      onDelete: 'CASCADE',
      as: 'meals',
      through: 'MealExtra',
    });
    Extra.belongsToMany(models.Order, {
      foreignKey: 'extraId',
      otherKey: 'orderId',
      onDelete: 'CASCADE',
      as: 'orders',
      through: 'OrderExtra',
    });
  };
  return Extra;
};
