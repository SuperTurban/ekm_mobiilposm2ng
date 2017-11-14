var assert = require('assert');

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
 
describe("Add a new game", function() {
	it('bla', function() {

		driver = new webdriver.Builder()
			.forBrowser('chrome')
			.build();
		
		driver.get("https://ekmweb.herokuapp.com");

		login(driver);
		driver.wait(until.urlContains("/games"));
		
		driver.findElement(By.className("btn-success")).click();
		driver.wait(until.urlContains("/create-game"));

		driver.findElement(By.id("submit-game")).click();
		driver.wait(until.elementLocated(By.className("validation-error")));
		
		driver.findElement(By.id("game_title")).sendKeys("at_test");
		driver.findElement(By.id("game_description")).sendKeys("test descr");
		driver.findElement(By.id("game_active")).click();
		driver.findElement(By.className("multiselect__select")).click();
		driver.findElement(By.className("multiselect__content"))
			.findElement(By.xpath("./li[@class='multiselect__element'][1]/span")).click();
		
		driver.quit();
	});
});

describe ("Add a new destination point", function() {
	it ('bla', function() {
		
		driver = new webdriver.Builder()
			.forBrowser('chrome')
			.build();
		
		driver.get("https://ekmweb.herokuapp.com");

		login(driver);
		driver.wait(until.urlContains("/games"));

		driver.findElement(By.xpath("//a[text()='Mängude sihtkohad']")).click();
		driver.wait(until.urlContains("/destinations"));
		
		driver.findElement(By.xpath("//a[@href='#/create-destination']")).click();
		driver.wait(until.urlContains("/create-destination"));
		
		var save = driver.findElement(By.xpath("//button[contains(text(), 'Salvesta')]"));
		save.click();
		driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Punktil peab olema nimi! (vähemalt 3 tähte)')]")));
		
		driver.findElement(By.id("point_title")).sendKeys("at test point");
		save.click();
		driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Punktil peab olema kirjeldus (vähemalt 10 tähte)')]")));
		
		driver.findElement(By.id("point_description")).sendKeys("test description");
		save.click();
		driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Koordinaadid peavad määratud olema')]")));
		
		driver.findElement(By.xpath("//div[@class='vue-map-container']")).click();
		save.click();
		driver.wait(until.urlContains("/destinations"));
		
		//driver.findElement(By.className("games-list")).findElement(By.xpath(".//a[contains(text(), 'at test point')]"));
		
		driver.quit();
	});
});

function login(driver) {
	driver.findElement(By.name("email")).sendKeys("admin@localhost");
	driver.findElement(By.name("password")).sendKeys("testpassword");
	driver.findElement(By.tagName("button")).click();
}