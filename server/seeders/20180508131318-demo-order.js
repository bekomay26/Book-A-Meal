module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Orders', [
      {
        mealId: 1,
        address: 'bbdjgbhjmbgh',
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mealId: 3,
        address: 'fdjkdjhdhgjd',
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Orders', {
      id: [1, 2],
    }, {});
  },
};
