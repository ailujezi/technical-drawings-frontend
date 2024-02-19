import {Builder, WebDriver } from "selenium-webdriver";

import {checkLogin} from "./test-login"

async function main(): Promise<void> {
    let driver: WebDriver = await new Builder().forBrowser('chrome').build();
    
    try {
        await checkLogin(driver);
    } finally {
        await driver.quit();
    }
}

main();