import faker from 'faker';

const menus = [{
  id: 2111,
  date: '2018-5-4', // use yyyy-mm-dd format
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
},
{
  id: 2116,
  date: '5/4/2018', // use yyyy-mm-dd format
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
},
{
  id: 2117,
  date: '2018-9-4', // use yyyy-mm-dd format
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
},
{
  id: 2112,
  date: '2019/02/14', // use these format
  meals: [ // would be mealsId in the database
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
