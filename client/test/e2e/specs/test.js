// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Loginpage UI should be in place' : function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.panel-title')
      .assert.elementPresent('input[name=email]')
      .assert.elementPresent('input[name=password]')
      .assert.elementPresent('button')
      .end()
  }
}
