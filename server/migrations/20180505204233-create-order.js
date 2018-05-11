module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dateTimeOrdered: {
        type: Sequelize.DATE,
      },
      est_readyTime: {
        type: Sequelize.INTEGER,
      },
      dateTimeDelivered: {
        type: Sequelize.DATE,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Cancelled', 'Completed', 'Pending'],
      },
      address: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
      createdById: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'createdById',
        },
      },
      cateredById: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'cateredById',
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
    queryInterface.dropTable('Orders');
  },
};
