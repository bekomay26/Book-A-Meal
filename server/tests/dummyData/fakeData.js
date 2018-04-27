import faker from 'faker';

const meals = [{
  id: 1111,
  title: 'Egusi soup',
  description: faker.lorem.sentence(),
  image: faker.image.imageUrl(),
  price: 50,
  extras: [{
    id: 11,
    title: 'Akpu',
    price: 100,
    type: 'goesWith',
    qty: 1,
  },
  {
    id: 21,
    title: 'Meat',
    price: 50,
    type: 'onTop',
    qty: 1,
  }],
  qty: 1,
},
{
  id: 1112,
  title: faker.lorem.word(),
  description: faker.lorem.sentence(),
  image: faker.image.imageUrl(),
  price: 99,
  extras: [{
    id: 11,
    title: faker.lorem.word(),
    price: 100,
    type: 'goesWith',
    qty: 1,
  }],
  qty: 1,
}];

export default meals;
