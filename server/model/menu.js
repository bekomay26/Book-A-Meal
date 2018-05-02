module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    date: DataTypes.DATEONLY,
    createdBy: DataTypes.STRING,
    last_editedBy: DataTypes.STRING,
  }, {});
  Menu.associate = (models) => {
    Menu.belongsToMany(models.Meal, {
      foreignKey: 'mealId',
      as: 'meals',
      through: 'MenuMeal',
    });
  };
  return Menu;
};
