import faker from 'faker';

const menus = [{
  id: 2111,
  date: '26/14/2221',
  meals: [ // would be mealsId in database
    {
      id: 1222,
      name: 'Black Soup',
      description: faker.lorem.sentence(),
      category: 'Snacks', // try enums for db
      price: 870,
      image_url: faker.image.imageUrl(),
      extras: ['Garri', 'Amala', 'Akpu'], // extras should have its own table in db
    },
    {
      id: 1223,
      name: 'White Soup',
      description: faker.lorem.sentence(),
      category: 'Snacks', // try enums for db
      price: 970,
      image_url: faker.image.imageUrl(),
      extras: ['Garri', 'Amala', 'Akpu'], // extras should have its own table in db
    },
  ],
  createdBy: faker.name.firstName(),
  editedBy: [faker.name.lastName(), faker.name.lastName()], // More than one person can edit a menu
}];

export default menus;
