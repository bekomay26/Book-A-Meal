import faker from 'faker';
// A single menu -- Array of meals
const menu = [
  {
    id: 1222,
    name: 'Black Soup',
    description: faker.lorem.sentence(),
    category: 'Snacks',
    price: 870,
    image_url: faker.image.imageUrl(),
    extras: ['Garri', 'Amala', 'Akpu'],
    qty: 1,
  },
  {
    id: 1223,
    name: 'White Soup',
    description: faker.lorem.sentence(),
    category: 'Snacks', // try enums for db
    price: 970,
    image_url: faker.image.imageUrl(),
    extras: ['Garri', 'Amala', 'Akpu'],
    qty: 1,
  },
];

export default menu;
