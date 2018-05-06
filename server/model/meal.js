module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  }, {});
  Meal.associate = (models) => {
    Meal.belongsToMany(models.Extra, {
      foreignKey: 'mealId',
      otherKey: 'extraId',
      onDelete: 'CASCADE',
      as: 'extras',
      through: 'MealExtra',
    });
    Meal.belongsToMany(models.Menu, {
      foreignKey: 'mealId',
      otherKey: 'menuId',
      onDelete: 'CASCADE',
      as: 'menus',
      through: 'MenuMeal',
    });
    Meal.hasMany(models.Order, {
      foreignKey: 'mealId',
      as: 'orders',
    });
  };
  return Meal;
};
