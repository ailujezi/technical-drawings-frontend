import {  By, until ,WebDriver } from 'selenium-webdriver';


export async function checkProjektClicked(driver: WebDriver, name: string): Promise<void> {

    try {
        await driver.get("http://localhost:4200");

        // Finde ein Projekt aus der Projectlist
        const project = await driver.findElement(By.id(name));

        await project.click();

        await driver.sleep(1000);

        // Überprüfe, projectdetails durch element darin.
        let projectDetailsName = await driver.findElement(By.id("project-name"));
        let isProjectDetailsNameDisplayed = await projectDetailsName.isDisplayed();

        if (!isProjectDetailsNameDisplayed) {
            console.log("Die Projektdetails ist nach dem Klick sichtbar, wie erwartet.");
        } else {
            console.log("Die Projektdetails ist nach dem Klick nicht sichtbar, was nicht erwartet wurde.");
        }

    } catch (error) {
        console.error("Während des Tests ist ein Fehler aufgetreten:", error);
    } finally {
        await driver.quit();
    }

}

