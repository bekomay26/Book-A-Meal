module.exports = (sequelize, DataTypes) => {
  const MealExtra = sequelize.define('MealExtra', {
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meals',
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
  });
  return MealExtra;
};
