module.exports = {
    'beforeEach' : function(browser){
        const devServer = browser.globals.devServerURL
        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .setValue('input[name=email]', 'admin@localhost')
            .setValue('input[name=password]', 'testpassword')
            .click('button[type=submit]')
            .waitForElementVisible('#games-container',5000)
    },
    'Creating new game with correct values should create a new game' : function(browser){
        browser
            .click("a[href='#/create-game")
            .waitForElementVisible("input#game_title",5000)
            .setValue("input#game_title", "TEST TITLE")
            .setValue("textarea#game_description", "TEST DESCRIPTION")
            .click("#submit-game")
            .end();
    },
    'Created game should have correct values' : function(browser){
        browser
            .assert.elementPresent("a[data-name='TEST TITLE']")
            .click("a[data-name='TEST TITLE']")
            .waitForElementVisible("input#game_title",5000)
            .assert.value("#game_title", "TEST TITLE")
            .assert.value("#game_description", "TEST DESCRIPTION")
            .end();            
    },

    'Invalid input values should be catched by validation' : function(browser){
        browser
            .click("a[href='#/create-game")
            .waitForElementVisible("input#game_title",5000)
            .setValue("input#game_title", "TE")
            .setValue("textarea#game_description", "TEST DESCRIPTION")
            .click("#submit-game")
            .waitForElementVisible(".validation-error",5000)
            .end();
    },

    'Delete button should delete the game' : function(browser){
        browser
            .click("button[data-deletename='TEST TITLE'")
            .waitForElementNotPresent("button[data-deletename='TEST TITLE']", 5000)
            .end();
    }
}
