// module.exports = {
//   beforeEach(client) {
//     client
//       .windowMaximize()
//       .url('http://localhost:4000/login')
//       .waitForElementPresent('body', 500)
//       .waitForElementPresent('.authForm', 500)
//       .setValue('input[name=uname]', 'folajimi')
//       .setValue('input[name=pwd]', 'Crimson26')
//       .submitForm('button')
//       .pause(2000)
//       .waitForElementVisible('body', 1000);
//   },

//   'User should be able to see menu': (client) => {
//     client
//       // Create order
//       .assert.visible('.menu-page-container')
//       .click('.menu-page-container > div > .col-48.menu-meal-item:nth-child(1)')
//       .pause(1000)
//       .waitForElementVisible('.ant-drawer-content-wrapper')
//       .pause(500)
//       // checkbox click not working
//       .click('.menu-page-form-body > .menu-page-mealwith > div:nth-child(2) > .ui.vertically.divided.grid > .row > .eight.wide.column > .ui.checkbox.menu-modalextra-text input')
//       .clearValue('.menu-page-form-body > .menu-page-mealwith > div:nth-child(2) > .ui.vertically.divided.grid > .row > .four.wide.column.menu-modalextra-qty-grid input')
//       .setValue('.menu-page-form-body > .menu-page-mealwith > div:nth-child(2) > .ui.vertically.divided.grid > .row > .four.wide.column.menu-modalextra-qty-grid input', 4)
//       .pause(1000)
//       .click('.menu-page-form > .field.orderButton > button')
//       .pause(7000)

//       // Edit order
//       // .click('.topnav.row.user-top > .col-6.navgroup > a.col-3.show.navlink:nth-child(2)')
//       .assert.containsText('.topnav.row.user-top > .col-6.navgroup > a.col-3.show.navlink:nth-child(3)', 'Order')
//       .click('.topnav.row.user-top > .col-6.navgroup > a.col-3.show.navlink:nth-child(3)')
//       // .click('#nav-orders')
//       .pause(9000)
//       .assert.visible('table')
//       .waitForElementVisible('table')
//       .click('tbody > tr > td:nth-child(5)')
//       .waitForElementVisible('.ant-drawer-content-wrapper')
//       .clearValue('.menu-page-form-body > .menu-page-mealwith > div:nth-child(2) > .ui.vertically.divided.grid > .row > .four.wide.column.menu-modalextra-qty-grid input')
//       .setValue('.menu-page-form-body > .menu-page-mealwith > div:nth-child(2) > .ui.vertically.divided.grid > .row > .four.wide.column.menu-modalextra-qty-grid input', 7)
//       .pause(1000)
//       .click('.menu-page-form > .field.orderButton > button')
//       .pause(1000)
//       .end();
//   },

// };
