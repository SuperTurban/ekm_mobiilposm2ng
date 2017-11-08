module.exports = function(browser, devServer){
    return 
       browser
        .url(devServer)
        .waitForElementVisible('#app', 5000)
        .setValue('input[name=email]', 'admin@localhost')
        .setValue('input[name=password]', 'testpassword')
        .click('button[type=submit]')
}