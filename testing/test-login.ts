import {  By, until ,WebDriver } from 'selenium-webdriver';


export async function checkLogin(driver: WebDriver): Promise<void> {

    try {
        await driver.get("http://localhost:4200/login");
        await driver.findElement(By.id("login-username")).sendKeys("123");
        await driver.findElement(By.id("login-password")).sendKeys("123");

        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.wait(until.urlContains('login'), 10000);

        let currentUrl = await driver.getCurrentUrl();
        if (currentUrl === "http://localhost:4200") {
            console.log("Login erfolgreich.");
        } else {
            console.log("Login fehlgeschlagen.");
        }

    } finally {
        await driver.quit();
    }

}

