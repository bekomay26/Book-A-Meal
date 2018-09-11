// module.exports = {
//   beforeEach(client) {
//     client
//       .windowMaximize()
//       .url('http://localhost:4000/login')
//       .waitForElementVisible('body', 1000);
//   },

//   'User should be able to login with correct details': (client) => {
//     client
//       .assert.visible('div > .authForm')
//       .assert.visible('input[name=uname]')
//       .assert.visible('input[name=pwd]')
//       .setValue('input[name=uname]', 'folajimi')
//       .setValue('input[name=pwd]', 'Crimson26')
//       .click('button')
//       .pause(3000)
//       .assert.containsText('.navgroup > li:nth-child(1)', 'folajimi')
//       .pause(1000)
//       .end();
//   },

//   // 'User should not be able to login with wrong password': (client) => {
//   //   client
//   //     .setValue('input[name=uname]', 'folajimi')
//   //     .setValue('input[name=pwd]', 'folajimi')
//   //     .click('button')
//   //     .pause(3000)
//   //     .assert.containsText('p.danger', 'Invalid Credentials')
//   //     .pause(1000)
//   //     .end();
//   // },

//   // 'User should not be able to login with invalid input details': (client) => {
//   //   client
//   //     .assert.visible('input[name=email]')
//   //     .assert.visible('input[name=password]')
//   //     .assert.visible('p a[href="/signup?role=customer"]')
//   //     .assert.visible('p a[href="/signup?role=caterer"]')
//   //     .setValue('input[name=email]', 'olisa.com')
//   //     .click('input[name=password]')
//   //     .assert.containsText('input[name=email] + div.invalid-feedback', 'Invalid email address!')
//   //     .setValue('input[name=password]', '')
//   //     .click('input[name=email]')
//   //     .assert.containsText('input[name=password] + div.invalid-feedback', 'Required!')
//   //     .pause(1000)
//   //     .end();
//   // },
// };
