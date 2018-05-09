module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'bekomay26',
        password: '$2b$10$wvdCIAKnZv7lox06N8Z8C.HF9R3qdmLAvb.UKT1pKfQSbfW5w9P3C',
        role: 'Caterer',
        address: '6, ogabi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'hanaKenzou',
        password: '$2b$10$qyT83t78jEqTTf0XY02tJeivKTtOzh1LnMIjrs0E.FgYA9t5J3YN2',
        role: 'Customer',
        address: '6, ogabi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'david',
        password: 'fola',
        role: 'Customer',
        address: '6, ogabi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'peter',
        password: 'fola',
        role: 'Customer',
        address: '6, ogabi',
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
