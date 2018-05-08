module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Extras', [
      {
        title: 'beef',
        price: 50,
        category: 'GoesWith',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'chicken',
        price: 150,
        category: 'OnTop',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'fish',
        price: 200,
        category: 'GoesWith',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'mutton',
        price: 100,
        category: 'OnTop',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Extras', {
      category: [
        'OnTop',
        'GoesWith'],
    }, {});
  },
};
