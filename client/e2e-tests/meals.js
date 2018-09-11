module.exports = {
  beforeEach(client) {
    client
      .windowMaximize()
      .url('http://localhost:4000/login')
      .waitForElementPresent('body', 500)
      .waitForElementPresent('.authForm', 500)
      .setValue('input[name=uname]', 'bekomay26')
      .setValue('input[name=pwd]', 'Crimson26')
      .submitForm('button');
      // .click('button');
      // .waitForElementVisible('.ant-layout-content', 2000)
      // .click('.ant-layout-sider-children > ul > li:nth-child(4) > div > span')
      // .waitForElementVisible('.ant-layout-sider-children > ul > li:nth-child(4) > ul > li > a', 2000)
      // .click('.ant-layout-sider-children > ul > li:nth-child(4) > ul > li > a')
      // // .url('http://localhost:4000/setmenu')
      // .waitForElementVisible('.ant-layout', 1000);
  },
  // beforeEach(client) {
  //   client
  //     .windowMaximize()
  //     .url('http://localhost:4000/setmenu')
  //     .waitForElementVisible('body', 1000);
  // },

  'Caterer should be able to set menu': (client) => {
    client
      // Update meal
      .pause(500)
      .waitForElementVisible('.manage-meal-tab-body', 2000)
      .click('table > tbody > tr:nth-child(1) > td:nth-child(5)')
      .pause(500)
      .waitForElementVisible('.update-form', 2000)
      .clearValue('.update-form > .fields > .six.wide.field > .input > input')
      // .clearValue('.update-form > .fields > .field:nth-child(2) > .input > input')
      // .setValue('.update-form > .fields > .field:nth-child(2) > .input > input', 1250)
      .setValue('.update-form > .fields > .six.wide.field > .input > input', 1450)
      .clearValue('.update-form > .field > .update-textarea')
      .setValue('.update-form > .update-textarea', 'Good for the bones')
      .click('.add-meal-form-grid > .column:nth-child(1) > i.fa-plus-square')
      .pause(2000)
      // .submitForm('button')
      .click('.manage-meal-button > button')
      .pause(500)
      .assert.cssClassNotPresent('.update-form')
      // Delete
      .pause(500)
      .waitForElementVisible('.manage-meal-tab-body', 2000)
      .click('table > tbody > tr:nth-child(6) > td:nth-child(6)')
      .pause(200)
      .waitForElementVisible('.swal2-actions')
      .click('.swal2-actions button:nth-child(1)')
      .pause(2000)
      // Add
      .click('.manage-meal-tab-body > .menu > a:nth-child(2)')
      .waitForElementVisible('.add-meal-form', 2000)
      // .setValue('input[type="file"]', require('path').resolve('/home/My-PC/Desktop/img.png'))
      .clearValue('.add-meal-form > .fields > .ten.wide.field > .input > input')
      .setValue('.add-meal-form > .fields > .ten.wide.field > .input > input', 'Meat Pepper soup')
      .clearValue('.add-meal-form > .fields > .six.wide.field > .input > input')
      .setValue('.add-meal-form > .fields > .six.wide.field > .input > input', 1250)
      .clearValue('.add-meal-form > .field > .add-meal-textarea')
      .setValue('.add-meal-form > .field > .add-meal-textarea', 'Sweet and yummy')
      .click('.add-meal-form-grid > .column:nth-child(1) > .fa-plus-square')
      .click('.add-meal-form-grid > .column:nth-child(2) > .fa-plus-square')
      .pause(1000)
      .click('.field.manage-meal-button > button')
      .pause(3000)
      .click('.manage-meal-tab-body > menu > a:nth-child(1)')
      .pause(2000)
      .end();
  },

  // 'User should change tab to Edit Menu Meals': (client) => {
  //   client
  //     .click('.manage-menu-tab-body > .menu a:nth-child(2)')
  //     .pause(1000)
  //     .assert.elementNotPresent('.menu-items')
  //     .pause(1000)
  //     .end();
  // },
};
