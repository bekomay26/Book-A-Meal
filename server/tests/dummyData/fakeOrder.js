import faker from 'faker';

const orders = [{
  id: 3111,
  date: '26/14/2221', // use yyyy-mm-dd format
  orderedBy: faker.name.firstName(),
  createdBy: faker.name.firstName(),
  dateTimeOrdered: faker.date.recent(),
  delMinutesEst: faker.random.number(15, 40, 5),
  delTime: faker.date.recent(),
  tPrice: faker.random.number(100, 1000, 50),
  meal: {
    id: 4222,
    name: 'Black Soup',
    description: faker.lorem.sentence(),
    category: 'Snacks',
    price: 970,
    image_url: faker.image.imageUrl(),
    extras: ['Garri', 'Amala', 'Akpu'],
  },
  status: 'complete', // 4 variables - complete, cancelled, pendingUser, pendingAdmin
},
];

export default orders;
