module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('MenuMeals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      menuId: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          as: 'menuId',
        },
      },
      mealId: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          as: 'mealId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    queryInterface.dropTable('MenuMeals');
  },
};
