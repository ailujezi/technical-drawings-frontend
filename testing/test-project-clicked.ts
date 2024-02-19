import {  By, until ,WebDriver } from 'selenium-webdriver';


export async function checkProjektClicked(driver: WebDriver): Promise<void> {

    try {
        await driver.get("http://localhost:4200");

        // Finde ein Projekt aus der Projectlist
        const project = await driver.findElement(By.id(""));

        await project.click();

        await driver.sleep(1000);

        // Überprüfe, projectdetails durch element darin.
        let projectDetailsName = await driver.findElement(By.id("project-list"));
        let isProjectDetailsNameDisplayed = await projectDetailsName.isDisplayed();

        if (!isProjectDetailsNameDisplayed) {
            console.log("Die Projektdetails ist nach dem Klick sichtbar, wie erwartet.");
        } else {
            console.log("Die Projektdetails ist nach dem Klick nicht sichtbar, was nicht erwartet wurde.");
        }

    } catch (error) {
        console.error("Ein Fehler ist aufgetreten während des Tests:", error);
    } finally {
        await driver.quit();
    }

}

