module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Menus', [
      {
        date: '6-10-2018',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: '10-6-2018',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Menus', {
      id: [1, 2],
    }, {});
  },
};
