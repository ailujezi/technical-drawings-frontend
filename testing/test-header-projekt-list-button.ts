import {  By, until ,WebDriver } from 'selenium-webdriver';


export async function checkHeaderProjektList(driver: WebDriver): Promise<void> {

    try {
        await driver.get("http://localhost:4200");

        // Finde den Button im header der die Projektliste toggled
        const toggleButton = await driver.findElement(By.id("project-list-hide-button"));

        await toggleButton.click();

        await driver.sleep(1000);

        // Überprüfe, sichtbarkeit der Projektliste
        let projectList = await driver.findElement(By.id("project-list"));
        let isProjectListDisplayed = await projectList.isDisplayed();

        if (!isProjectListDisplayed) {
            console.log("Die Projektliste ist nach dem ersten Klick nicht sichtbar, wie erwartet.");
        } else {
            console.log("Die Projektliste ist nach dem ersten Klick noch sichtbar, was nicht erwartet wurde.");
        }

        await toggleButton.click();

        await driver.sleep(1000);

        // Überprüfe, sichtbarkeit der Projektliste
        projectList = await driver.findElement(By.id("project-list"));
        isProjectListDisplayed = await projectList.isDisplayed();

        if (isProjectListDisplayed) {
            console.log("Die Projektliste ist nach dem zweiten Klick wieder sichtbar, wie erwartet.");
        } else {
            console.log("Die Projektliste ist nach dem zweiten Klick nicht sichtbar, was nicht erwartet wurde.");
        }

    } catch (error) {
        console.error("Ein Fehler ist aufgetreten während des Tests:", error);
    } finally {
        await driver.quit();
    }

}

