import {Builder, WebDriver } from "selenium-webdriver";

import {checkLogin} from "./test-login"
import { checkHeaderProjectList } from "./test-header-project-list-button";
import { checkProjektClicked } from "./test-project-clicked";

async function main(): Promise<void> {
    let driver: WebDriver = await new Builder().forBrowser('chrome').build();
    let projectname: string = "this is a Test";
    try {
        await checkLogin(driver);
        await checkHeaderProjectList(driver);
        await checkProjektClicked(driver, projectname);
    } finally {
        await driver.quit();
    }
}

main();