module.exports = (sequelize, DataTypes) => {
  const MenuMeal = sequelize.define('MenuMeal', {
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Menus',
        key: 'id',
      }
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meals',
        key: 'id',
      }
    }
  });
  //   menuId: DataTypes.INTEGER,
  //   mealId: DataTypes.INTEGER,
  // }, {});
  // MenuMeal.associate = function(models) {
  //   // associations can be defined here
  // };
  return MenuMeal;
};
