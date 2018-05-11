module.exports = (sequelize, DataTypes) => {
  const MenuMeal = sequelize.define('MenuMeal', {
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Menus',
        key: 'id',
      },
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meals',
        key: 'id',
      }
    },
  });
  return MenuMeal;
};
