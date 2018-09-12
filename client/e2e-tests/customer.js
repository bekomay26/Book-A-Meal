module.exports = {
  beforeEach(client) {
    client
      .windowMaximize()
      .url('http://localhost:5000/')
      .click('#bigpic > div > div.top.row.home-nav > nav > li.col-3.show > a')
      .waitForElementPresent('body', 500)
      .click('#app > div > div > div > div > div.ui.pointing.secondary.menu > a:nth-child(2)')
      .waitForElementPresent('.authForm', 500)
      .click('#app > div > div > div > div > div.ui.pointing.secondary.menu > a:nth-child(1)')
      .waitForElementPresent('.authForm', 500)
      .setValue('input[name=uname]', 'folajimi')
      .setValue('input[name=pwd]', 'Crimson26')
      .submitForm('button')
      .pause(2000)
      .waitForElementVisible('body', 1000);
  },

  'User should be able to see menu': (client) => {
    client
      // Create order
      .assert.visible('.menu-page-container')
      .assert.visible('.menu-page-container > div > .col-48.menu-meal-item:nth-child(1)')
      .click('.menu-page-container > div > .col-48.menu-meal-item:nth-child(1)')
      .pause(1000)
      .waitForElementVisible('.ant-drawer-content-wrapper')
      .pause(1000)
      .assert.visible('#mealwith > div:nth-child(2) > div > div > div.eight.wide.column > div')
      .pause(1000)
      .assert.visible('#mealwith > div:nth-child(2) > div > div > div.eight.wide.column > div')
      .click('#mealwith > div:nth-child(2) > div > div > div.eight.wide.column > div')
      .pause(500)
      .assert.visible('.menu-page-form-body > .menu-page-mealwith > div:nth-child(2) > .ui.vertically.divided.grid > .row > .four.wide.column.menu-modalextra-qty-grid input')
      .clearValue('.menu-page-form-body > .menu-page-mealwith > div:nth-child(2) > .ui.vertically.divided.grid > .row > .four.wide.column.menu-modalextra-qty-grid input')
      .setValue('.menu-page-form-body > .menu-page-mealwith > div:nth-child(2) > .ui.vertically.divided.grid > .row > .four.wide.column.menu-modalextra-qty-grid input', 4)
      .pause(1000)
      .assert.visible('.menu-page-form > .field.orderButton > button')
      .click('.menu-page-form > .field.orderButton > button')
      .pause(7000)

      // Edit order
      // .click('.topnav.row.user-top > .col-6.navgroup > a.col-3.show.navlink:nth-child(2)')
      .assert.containsText('.topnav.row.user-top > .col-6.navgroup > a.col-3.show.navlink:nth-child(3)', 'Order')
      .click('.topnav.row.user-top > .col-6.navgroup > a.col-3.show.navlink:nth-child(3)')
      .pause(9000)
      .assert.visible('table')
      .waitForElementVisible('table')
      .pause(1000)
      .end();
  },

};
