import faker from 'faker';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Meals', [
      {
        title: 'rice',
        description: faker.lorem.sentence(),
        image: faker.image.imageUrl(),
        price: 450,
        extraIds: [1, 2],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: faker.lorem.word(),
        description: faker.lorem.sentence(),
        image: faker.image.imageUrl(),
        price: 130,
        extraIds: [1, 3],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: faker.lorem.word(),
        description: faker.lorem.sentence(),
        image: faker.image.imageUrl(),
        price: 200,
        extraIds: [2, 3],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: faker.lorem.word(),
        description: faker.lorem.sentence(),
        image: faker.image.imageUrl(),
        price: 1050,
        extraIds: [1, 2, 3],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Meals', {
      price: [
        450,
        130,
        200,
        1050],
    }, {});
  },
};
