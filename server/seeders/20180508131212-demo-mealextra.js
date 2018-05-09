module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('MealExtras', [
      {
        mealId: 1,
        extraId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mealId: 1,
        extraId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mealId: 1,
        extraId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mealId: 2,
        extraId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mealId: 2,
        extraId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mealId: 3,
        extraId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mealId: 3,
        extraId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mealId: 4,
        extraId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mealId: 4,
        extraId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('MealExtras', {
      mealId: [
        1,
        2,
        3,
        4],
    }, {});
  },
};
