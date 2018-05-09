module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('MenuMeals', [
      {
        menuId: 1,
        mealId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        menuId: 1,
        mealId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        menuId: 1,
        mealId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        menuId: 2,
        mealId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        menuId: 2,
        mealId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('MenuMeals', {
      id: [1, 2, 3, 4, 5],
    }, {});
  },
};
