[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/bekomay26/Book-A-Meal/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/bekomay26/Book-A-Meal/test_coverage) [![Build Status](https://travis-ci.org/bekomay26/Book-A-Meal.svg?branch=ft-documentation-route-157720673)](https://travis-ci.org/bekomay26/Book-A-Meal) [![Coverage Status](https://coveralls.io/repos/github/bekomay26/Book-A-Meal/badge.svg?branch=ft-documentation-route-157720673)](https://coveralls.io/github/bekomay26/Book-A-Meal?branch=ch-implement-chll2-feedback-157243679)
# Book-A-Meal

An application that allows customers to make food orders, helps the food vendor decide on what to eat and aids the caterer in managing the business.

## Demo
- [Book-A-Meal Customer](https://bekomay26.github.io/Book-A-Meal/UI/html/user/).
- [Book-A-Meal Admin](https://bekomay26.github.io/Book-A-Meal/UI/html/admin/admin.html).
- [Book-A-Meal API Endpoints on heroku](https://buuk-a-meal.herokuapp.com/api/v1/).
- [Documentation](https://buuk-a-meal.herokuapp.com/api/v1/docs/).

## Features

### User

- View day's menu
- Order a meal
- Modify order
- Delete order

### Admin
- Create meal options
- Modiy meal options
- Delete meal options
- Create meal plan for a specific day
- View day's orders and summary
- View month and year's summary

### API Endpoints

- Retrieve all Meal Options - GET http://localhost:4000/api/v1/meals
- Add a Meal Option - POST http://localhost:4000/api/v1/meals
- Modify Meal Option - PUT http://localhost:4000/api/v1/meals/:mealId
- Delete - DELETE http://localhost:4000/api/v1/meals/:mealId
- Add Meals to Menu - POST http://localhost:4000/api/v1/menu
- Retrieve Today's Menu - GET http://localhost:4000/api/v1/menu
- Add an Order - POST http://localhost:4000/api/v1/orders
- Retrieve all Orders - GET http://localhost:4000/api/v1/orders
- Update Order -PUT http://localhost:4000/api/v1/meals/:orderId

- Delete a future Menu - DELETE http://localhost:4000/api/v1/meals/:menuId
- Retrieve all Orders for a day - GET http://localhost:4000/api/v1/orders/:dateString
- Delete Order - DELETE http://localhost:4000/api/v1/meals/:orderId

### Payload samples for POST and PUT requests

#### Add a Meal Option: `/api/v1/meals`

To add a new Meal, send the following parameters (sample below):
```
{
  title: 'Bread',
  description: 'Bread Bread',
  image: 'images/img.jpeg',
  price: 99
}
```
NB: price and title parameters must be inputted.

#### Modify Meal Option: `/api/v1/meals/:id`

To edit an existing meal option, send any of the parameters above (sample below):
```
{
  title: 'Rice',
  description: 'Breaded Rice'
}
```

#### Add a Menu: `/api/v1/menu`

To add a new Menu, send the following parameters (sample below):
```
{
  date: '26/14/2018',
  meals: ['meal1', 'meal2'],
  createdBy: 'fola'
};
```

#### Add an order: `/api/v1/orders`


To add a new Menu, send the following parameters (sample below):
```
{ 
  mealId: 1222, 
  address: '6, gbagada street' 
}
```

#### Update orders: `/api/v1/orders/:id`

To edit an order, send any of the parameters above (sample below):
```
{
  extras: ['rice', 'potato'],
  qty: 2
}
```
