module.exports = {
  beforeEach(client) {
    client
      .windowMaximize()
      .url('http://localhost:5000/login')
      .waitForElementPresent('body', 500)
      .waitForElementPresent('.authForm', 500)
      .setValue('input[name=uname]', 'bekomay26')
      .setValue('input[name=pwd]', 'Crimson26')
      .submitForm('button');
  },

  'Caterer should be able to set menu': (client) => {
    client
      // Update meal
      .pause(500)
      .waitForElementVisible('.manage-meal-tab-body', 2000)
      .assert.visible('table > tbody > tr:nth-child(1) > td:nth-child(5)')
      .click('table > tbody > tr:nth-child(1) > td:nth-child(5)')
      .pause(500)
      .waitForElementVisible('.update-form', 2000)
      .assert.containsText('body > div:nth-child(3) > div > div.ant-drawer-content-wrapper > div > div > div.ant-drawer-header > div', 'Update Meal')
      .clearValue('.update-form > .fields > .six.wide.field > .input > input')
      .setValue('.update-form > .fields > .six.wide.field > .input > input', 1550)
      .clearValue('.update-form > .field.update-textarea')
      .setValue('.update-form > .field.update-textarea', 'Good for the bones')
      .click('#meal-add-btn1')
      .pause(2000)
      .assert.visible('.manage-meal-button > button')
      .click('.manage-meal-button > button')
      .pause(4500)
      .assert.cssClassNotPresent('.update-form')

      // Delete
      .pause(500)
      .waitForElementVisible('.manage-meal-tab-body', 2000)
      .assert.visible('#app > div > div > div > div > div.sidelayout.ant-layout.ant-layout-has-sider > div.ant-layout > div.ant-layout-content > div > div > div.ui.segment.active.tab > div > table > tbody > tr:nth-child(3) > td:nth-child(6)')
      .click('#app > div > div > div > div > div.sidelayout.ant-layout.ant-layout-has-sider > div.ant-layout > div.ant-layout-content > div > div > div.ui.segment.active.tab > div > table > tbody > tr:nth-child(3) > td:nth-child(6)')

      .pause(200)
      .waitForElementVisible('.swal2-actions')
      .click('.swal2-actions button:nth-child(1)')
      .pause(2000)

      // Add
      .assert.visible('.manage-meal-tab-body > .menu > a:nth-child(2)')
      .click('.manage-meal-tab-body > .menu > a:nth-child(2)')
      .waitForElementVisible('.add-meal-form', 2000)
      .clearValue('.add-meal-form > .fields > .ten.wide.field > .input > input')
      .setValue('.add-meal-form > .fields > .ten.wide.field > .input > input', 'Meatgsffshy Pepper soup')
      .clearValue('.add-meal-form > .fields > .six.wide.field > .input > input')
      .setValue('.add-meal-form > .fields > .six.wide.field > .input > input', 1250)
      .clearValue('.add-meal-form > .field.add-meal-textarea > textarea')
      .setValue('.add-meal-form > .field.add-meal-textarea > textarea', 'Sweet and yummy')
      .pause(1000)
      .assert.visible('.ui.form.add-meal-form > .ui.divided.two.column.grid.add-meal-form-grid > .row > div.column:nth-child(1) > div > i.fa-plus-square')
      .click('.ui.form.add-meal-form > .ui.divided.two.column.grid.add-meal-form-grid > .row > div.column:nth-child(1) > div > i.fa-plus-square')
      .click('.ui.form.add-meal-form > .ui.divided.two.column.grid.add-meal-form-grid > .row > div.column:nth-child(2) > div > i.fa-plus-square')
      .pause(1000)
      .assert.visible('.field.manage-meal-button > button.ui.button')
      .click('.field.manage-meal-button > button.ui.button')
      .pause(3000)
      .assert.containsText('#app > div > div > div > div > div.sidelayout.ant-layout.ant-layout-has-sider > div.ant-layout > div.ant-layout-content > div > div > div.ui.pointing.secondary.menu > a:nth-child(1)', 'View Meals')
      .click('#app > div > div > div > div > div.sidelayout.ant-layout.ant-layout-has-sider > div.ant-layout > div.ant-layout-content > div > div > div.ui.pointing.secondary.menu > a:nth-child(1)')
      .pause(2000)

      // Orders
      .assert.visible('#app > div > div > div > div > div.sidelayout.ant-layout.ant-layout-has-sider > div.ant-layout-sider.ant-layout-sider-dark > div > ul > li:nth-child(3) > span > a')
      .click('#app > div > div > div > div > div.sidelayout.ant-layout.ant-layout-has-sider > div.ant-layout-sider.ant-layout-sider-dark > div > ul > li:nth-child(3) > span > a')
      .assert.containsText('#app > div > div > div > div > div.sidelayout.ant-layout.ant-layout-has-sider > div.ant-layout > div.ant-layout-content > div > div.accordion.ui.styled > div.title.admin-order-accord-head > div.admin-order-title', 'Meal')
      .click('#app > div > div > div > div > div.sidelayout.ant-layout.ant-layout-has-sider > div.ant-layout > div.ant-layout-content > div > div.accordion.ui.styled > div:nth-child(3) > div.title')
      .click('#app > div > div > div > div > div.sidelayout.ant-layout.ant-layout-has-sider > div.ant-layout > div.ant-layout-content > div > div.accordion.ui.styled > div:nth-child(2) > div.title')
      .pause(1000)
      // Logout
      .assert.containsText('#myTopnav > nav > a', 'logout')
      .click('#myTopnav > nav > a')
      .end();
  },
};
