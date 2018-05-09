module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Menus', [
      {
        date: '1/1/2018',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: '1/2/2018',
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
