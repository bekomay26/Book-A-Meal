module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        fullname: 'folajimi',
        password: 'fola',
        role: 'Caterer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'joseph',
        password: 'fola',
        role: 'Customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'david',
        password: 'fola',
        role: 'Customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'peter',
        password: 'fola',
        role: 'Customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', {
      fullname: [
        'folajimi',
        'david',
        'joseph',
        'peter'],
    }, {});
  },
};
