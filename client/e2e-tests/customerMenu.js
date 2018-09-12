// module.exports = {
//   beforeEach(client) {
//     client
//       .windowMaximize()
//       .url('http://localhost:5000/menu')
//       .waitForElementVisible('body', 1000);
//   },

//   'User should be able to see menu': (client) => {
//     client
//       .assert.visible('.menu-page-container')
//       .assert.containsText('.menu-page-container > h1', "Today's Menu")
//       .setValue('input[name=uname]', 'folajimi')
//       .setValue('input[name=password]', 'fCrimson26')
//       .click('button')
//       .pause(3000)
//       .assert.containsText('.navgroup li:nth-child(1)', 'folajimi')
//       .pause(1000)
//       .end();
//   },

//   'User should not be able to login with wrong password': (client) => {
//     client
//       .setValue('input[name=uname]', 'folajimi')
//       .setValue('input[name=password]', 'folajimi')
//       .click('button')
//       .pause(3000)
//       .assert.containsText('p.danger', 'Invalid Credentials')
//       .pause(1000)
//       .end();
//   },
// };
