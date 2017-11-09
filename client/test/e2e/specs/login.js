module.exports = {
  'Loginpage UI should be in place' : function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.panel-title')
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('input[name=password]')
      .assert.elementPresent('button')
      .end()
  },
  'Loginpage UI should not let enter empty values' : function(browser){
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000);
  },
  'Login with correct input log in the user' : function(browser){
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .setValue('input[name=email]', 'admin@localhost')
      .setValue('input[name=password]', 'testpassword')
      .click('button[type=submit]')
      .waitForElementVisible('#games-container',5000)
      .end();
  }

}
