module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('OrderExtras', [
      {
        orderId: 1,
        extraId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        extraId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        extraId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        extraId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        extraId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('OrderExtras', {
      id: [1, 2, 3, 4, 5],
    }, {});
  },
};
