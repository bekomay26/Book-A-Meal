module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'folajimi',
        password: 'fola',
        role: 'Caterer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'joseph',
        password: 'fola',
        role: 'Customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'david',
        password: 'fola',
        role: 'Customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'peter',
        password: 'fola',
        role: 'Customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', {
      username: [
        'folajimi',
        'david',
        'joseph',
        'peter'],
    }, {});
  },
};
