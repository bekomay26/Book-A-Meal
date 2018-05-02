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
    qty: 1,
  },
  status: 'complete', // 4 variables - complete, cancelled, pendingUser, pendingAdmin
  startTimer: Date.now() - 5000, // simulate 5 secons ago
},
{
  id: 3121,
  date: '2221/1/23', // use yyyy-mm-dd format
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
    qty: 1,
  },
  status: 'complete', // 4 variables - complete, cancelled, pendingUser, pendingAdmin
  startTimer: Date.now() - 25000,
},
];

export default orders;
