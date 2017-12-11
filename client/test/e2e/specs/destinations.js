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
			.click("a[href='#/destinations")
			.waitForElementVisible('#destinations-container',5000)
	},
	'Creating new destination with correct values should create a new destination' : function(browser){
		browser
			.click("a[href='#/create-destination")
			.waitForElementVisible("input#point_title",5000)
			.setValue("input#point_title", "TEST DES TITLE")
			.setValue("textarea#point_description", "TEST DES DESCRIPTION")
			.click("div[class='vue-map-container']")
			.click("#submit-destination")
			.end();
	},   
	'Created destination point should have correct values' : function(browser){
        browser
            .assert.elementPresent("a[data-name='TEST DES TITLE']")
            .click("a[data-name='TEST DES TITLE']")
            .waitForElementVisible("input#point_title",5000)
            .assert.value("#point_title", "TEST DES TITLE")
            .assert.value("#point_description", "TEST DES DESCRIPTION")
            .end();            
    },
	'Invalid input values should be catched by validation' : function(browser){
        browser
            .click("a[href='#/create-destination")
            .waitForElementVisible("input#point_title",5000)
            .setValue("input#point_title", "TE")
            .setValue("textarea#point_description", "TE")
            .click("#submit-destination")
            .waitForElementVisible(".validation-error",5000)
            .end();
    },
	'Delete button should delete the destination point' : function(browser){
        browser
            .click("button[data-deletename='TEST DES TITLE']")
            .waitForElementNotPresent("button[data-deletename='TEST DES TITLE']", 5000)
            .end();
    }
}