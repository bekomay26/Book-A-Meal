// module.exports = {
//   beforeEach(client) {
//     client
//       .windowMaximize()
//       .url('http://localhost:4000/login')
//       .waitForElementVisible('body', 1000)
//       .waitForElementVisible('.authForm', 1000)
//       .setValue('input[name=uname]', 'bekomay26')
//       .setValue('input[name=pwd]', 'Crimson26')
//       .click('button')
//       .waitForElementVisible('.ant-layout-content', 2000)
//       .click('.ant-layout-sider-children > ul > li:nth-child(4) > div > span')
//       .waitForElementVisible('.ant-layout-sider-children > ul > li:nth-child(4) > ul > li > a', 2000)
//       .click('.ant-layout-sider-children > ul > li:nth-child(4) > ul > li > a')
//       // .url('http://localhost:4000/setmenu')
//       .waitForElementVisible('.ant-layout', 1000);
//   },
//   // beforeEach(client) {
//   //   client
//   //     .windowMaximize()
//   //     .url('http://localhost:4000/setmenu')
//   //     .waitForElementVisible('body', 1000);
//   // },

//   'Caterer should be able to set menu': (client) => {
//     client
//       .waitForElementVisible('.manage-menu-tab-body', 2000)
//       .assert.containsText('.manage-menu-tab-body > .menu > a:nth-child(1)', 'Set Menu')
//       .assert.containsText('.manage-menu-tab-body > .menu > a:nth-child(2)', 'Edit Menu Meals')
//       .assert.containsText('.manage-menu-tab-body > .menu > a:nth-child(3)', 'Menu History')
//       .assert.visible('.menu-items')
//       .pause(1000)
//       // .assert.containsText('.menu-items > #todaysList > li:nth-child(1)', 'Rice and fish')
//       .assert.cssClassNotPresent('.menu-items > ul > li:nth-child(1)', 'checked')
//       .click('.menu-items > ul > li:nth-child(1)')
//       .pause(1000)
//       .click('.menu-items > ul > li:nth-child(2)')
//       .pause(1000)
//       .click('.menu-items > ul > li:nth-child(3)')
//       .pause(1000)
//       .click('.menu-items > ul > li:nth-child(5)')
//       .pause(1000)
//       .click('.menu-items > ul > li:nth-child(4)')
//       .pause(1000)
//       .click('.menu-items > ul > li:nth-child(6)')
//       .pause(1000)
//       .assert.cssClassPresent('.menu-items > ul > li:nth-child(1)', 'checked')
//       .click('button')
//       .pause(1000)
//       .url('http://localhost:4000/menu')
//       .pause(6000)
//       // check menu page
//       .end();
//   },

//   // 'User should change tab to Edit Menu Meals': (client) => {
//   //   client
//   //     .click('.manage-menu-tab-body > .menu a:nth-child(2)')
//   //     .pause(1000)
//   //     .assert.elementNotPresent('.menu-items')
//   //     .pause(1000)
//   //     .end();
//   // },
// };
