const getMenuResponse = {
  menu: {
    id: 34,
    date: '2018-09-05',
    createdBy: null,
    last_editedBy: null,
    createdAt: '2018-09-05T19:52:08.860Z',
    updatedAt: '2018-09-05T19:52:08.860Z',
    meals: [
      {
        id: 49,
        title: 'Basmatic Rice',
        description: 'Good for the brains.',
        image_url: 'https://res.cloudinary.com/dffiyhgto/image/upload/v1535103036/Fggg435.jpg',
        price: 435,
        quantity: 1,
        createdAt: '2018-08-24T09:30:36.495Z',
        updatedAt: '2018-09-04T04:06:11.714Z',
        MenuMeal: {},
        extras: [
          {
            id: 1,
            title: 'beef',
            category: 'GoesWith',
            price: 50,
            MealExtra: {
              mealId: 49,
              extraId: 1,
              createdAt: '2018-08-24T09:30:36.532Z',
              updatedAt: '2018-08-24T09:30:36.532Z',
            },
          },
          {
            id: 2,
            title: 'chicken',
            category: 'OnTop',
            price: 150,
            MealExtra: {
              mealId: 49,
              extraId: 2,
              createdAt: '2018-08-24T09:30:36.532Z',
              updatedAt: '2018-08-24T09:30:36.532Z',
            },
          },
          {
            id: 3,
            title: 'fish',
            category: 'GoesWith',
            price: 200,
            MealExtra: {
              mealId: 49,
              extraId: 3,
              createdAt: '2018-08-24T09:30:36.532Z',
              updatedAt: '2018-08-24T09:30:36.532Z',
            },
          },
        ],
      },
      {
        id: 41,
        title: 'Ogbonna',
        description: 'Ogbonna is a meal that xy&#x27;s and z',
        image_url: 'https:&#x2F;&#x2F;res.cloudinary.com&#x2F;dffiyhgto&#x2F;image&#x2F;upload&#x2F;v1533443184&#x2F;Asanka509.jpg',
        price: 350,
        quantity: 1,
        createdAt: '2018-08-21T05:46:40.200Z',
        updatedAt: '2018-08-21T06:14:03.114Z',
        MealMeal: {},
        extras: [
          {
            id: 1,
            title: 'beef',
            category: 'GoesWith',
            price: 50,
            MealExtra: {
              mealId: 41,
              extraId: 1,
              createdAt: '2018-08-21T06:14:03.141Z',
              updatedAt: '2018-08-21T06:14:03.141Z',
            },
          },
          {
            id: 2,
            title: 'chicken',
            category: 'OnTop',
            price: 150,
            MealExtra: {
              mealId: 41,
              extraId: 2,
              createdAt: '2018-08-21T06:14:03.141Z',
              updatedAt: '2018-08-21T06:14:03.141Z',
            },
          },
          {
            id: 3,
            title: 'fish',
            category: 'GoesWith',
            price: 200,
            MealExtra: {
              mealId: 41,
              extraId: 3,
              createdAt: '2018-08-21T06:14:03.141Z',
              updatedAt: '2018-08-21T06:14:03.141Z',
            },
          },
          {
            id: 4,
            title: 'mutton',
            category: 'OnTop',
            price: 100,
            MealExtra: {
              mealId: 41,
              extraId: 4,
              createdAt: '2018-08-21T06:14:03.141Z',
              updatedAt: '2018-08-21T06:14:03.141Z',
            },
          },
        ],
      },
    ],
  },
};

const saveMenuResponse = {
  menu: [
    {
      id: 54,
      title: 'gfhgh',
      description: null,
      image_url: 'https://res.cloudinary.com/dffiyhgto/image/upload/v1536160768/gfhgh980.jpg',
      price: 980,
      quantity: 1,
      createdAt: '2018-09-05T15:19:29.689Z',
      updatedAt: '2018-09-05T15:19:29.689Z',
      MenuMeal: {},
      extras: [
        {
          id: 1,
          title: 'beef',
          category: 'GoesWith',
          price: 50,
          MealExtra: {
            mealId: 54,
            extraId: 1,
            createdAt: '2018-09-05T15:19:29.709Z',
            updatedAt: '2018-09-05T15:19:29.709Z',
          },
        },
        {
          id: 2,
          title: 'chicken',
          category: 'OnTop',
          price: 150,
          MealExtra: {
            mealId: 54,
            extraId: 2,
            createdAt: '2018-09-05T15:19:29.709Z',
            updatedAt: '2018-09-05T15:19:29.709Z',
          },
        },
        {
          id: 4,
          title: 'mutton',
          category: 'OnTop',
          price: 100,
          MealExtra: {
            mealId: 54,
            extraId: 4,
            createdAt: '2018-09-05T15:19:29.709Z',
            updatedAt: '2018-09-05T15:19:29.709Z',
          },
        },
      ],
    },
    {
      id: 54,
      title: 'gfhgh',
      description: null,
      image_url: 'https://res.cloudinary.com/dffiyhgto/image/upload/v1536160768/gfhgh980.jpg',
      price: 980,
      quantity: 1,
      createdAt: '2018-09-05T15:19:29.689Z',
      updatedAt: '2018-09-05T15:19:29.689Z',
      MealMeal: {},
      extras: [
        {
          id: 1,
          title: 'beef',
          category: 'GoesWith',
          price: 50,
          MealExtra: {
            mealId: 54,
            extraId: 1,
            createdAt: '2018-09-05T15:19:29.709Z',
            updatedAt: '2018-09-05T15:19:29.709Z',
          },
        },
      ],
    },
  ],
};

export { getMenuResponse, saveMenuResponse };
