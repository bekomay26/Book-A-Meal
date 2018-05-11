module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('MealExtras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      extraId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Extras',
          key: 'id',
          as: 'extraId',
        },
      },
      mealId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Meals',
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
    queryInterface.dropTable('MealExtras');
  },
};
