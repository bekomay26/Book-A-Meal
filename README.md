[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage) [![Build Status](https://travis-ci.org/bekomay26/Book-A-Meal.svg?branch=ft-delete-order-api-157137664)](https://travis-ci.org/bekomay26/Book-A-Meal) [![Coverage Status](https://coveralls.io/repos/github/bekomay26/Book-A-Meal/badge.svg?branch=ft-delete-order-api-157137664)](https://coveralls.io/github/bekomay26/Book-A-Meal?branch=ft-delete-order-api-157137664)
# Book-A-Meal

An application that allows customers to make food orders, helps the food vendor decide on what to eat and aids the caterer in managing the business.

## Demo
[Book-A-Meal Customer](https://bekomay26.github.io/Book-A-Meal/UI/html/user/).
[Book-A-Meal Admin](https://bekomay26.github.io/Book-A-Meal/UI/html/admin/admin.html).
[Book-A-Meal API Endpoints on heroku](https://buuk-a-meal.herokuapp.com/api/v1/).


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

Retrieve all Meal Options - GET http://localhost:4000/api/v1/meals
Add a Meal Option - POST http://localhost:4000/api/v1/meals
Modify weisting Meal Option - PUT http://localhost:4000/api/v1/meals/:mealId
Delete - DELETE http://localhost:4000/api/v1/meals/:mealId
Add Meals to Menu - POST http://localhost:4000/api/v1/menu
Retrieve Meal From Menu - GET http://localhost:4000/api/v1/menu
Add an Order - POST http://localhost:4000/api/v1/orders
Retrieve all Orders - GET http://localhost:4000/api/v1/orders
Update Order -PUT http://localhost:4000/api/v1/meals/:orderId

Add Menu - POST http://localhost:4000/api/v1/menus
Retrieve all Menus - GET http://localhost:4000/api/v1/menus
Update Menu - PUT http://localhost:4000/api/v1/meals/:menuId
Delete a future Menu - DELETE http://localhost:4000/api/v1/meals/:menuId
Retrieve all Orders for a day - GET http://localhost:4000/api/v1/orders/:dateString
Delete Order - DELETE http://localhost:4000/api/v1/meals/:orderId