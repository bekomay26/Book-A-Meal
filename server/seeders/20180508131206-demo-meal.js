module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Meals', [
      {
        title: 'rice',
        description: 'fdfdhdufdfg',
        image_url: 'jhdfjhdfhjdfhjfd',
        price: 450,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'abka atam',
        description: 'fdfdhdufdfg',
        image_url: 'jhdfjhdfhjdfhjfd',
        price: 430,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'beans',
        description: 'fdfdhdufdfg',
        image_url: 'jhdfjhdfhjdfhjfd',
        price: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'yam',
        description: 'fdfdhdufdfg',
        image_url: 'jhdfjhdfhjdfhjfd',
        price: 1050,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Meals', {
      id: [1, 2, 3, 4],
    }, {});
  },
};
