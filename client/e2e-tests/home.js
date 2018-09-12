// module.exports = {
//   'User should be able to see home page with correct details': (client) => {
//     client
//       .windowMaximize()
//       .url('http://localhost:5000/')
//       .waitForElementVisible('body', 5000)
//       .waitForElementVisible('#app', 3000)
//       .assert.containsText('.home-nav > .logo', 'Book-A-Meal')
//       .assert.containsText('.menu > li:nth-child(2) > a', 'Menu')
//       .assert.containsText('.menu > li:nth-child(3) > a', 'Order')
//       .assert.containsText('.menu > li:nth-child(4) > a', 'Login')
//       .assert.containsText('.bigpic h1', 'Book-A-Meal')
//       .assert.containsText('.bigpic h3', '“One cannot think well, love well, sleep well, if one has not dined well.”')
//       .pause(3000)
//       .end();
//   },
// };
