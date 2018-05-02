module.exports = (sequelize, DataTypes) => {
  const MenuMeal = sequelize.define('MenuMeal', {
    menuId: DataTypes.INTEGER,
    mealId: DataTypes.INTEGER,
  }, {});
  MenuMeal.associate = function(models) {
    // associations can be defined here
  };
  return MenuMeal;
};
