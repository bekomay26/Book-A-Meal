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
    Meal.belongsToMany(models.Menu, {
      foreignKey: 'menuId',
      as: 'menus',
      through: 'menumeal',
    });
    Meal.belongsToMany(models.Order, {
      foreignKey: 'orderId',
      as: 'orders',
      through: 'ordermeal',
    });
  };
  return Meal;
};
