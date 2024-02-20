import {  By, until ,WebDriver } from 'selenium-webdriver';


export async function checkCreateProject(driver: WebDriver, name: string): Promise<void> {

    try {
        await driver.get("http://localhost:4200");

        // Finde den knopf um ein projekt zu erstellen
        const createProjectButton = await driver.findElement(By.id("create-project"));

        await createProjectButton.click();

        await driver.sleep(1000);


        await driver.findElement(By.id("create-project-name")).sendKeys(name);
        await driver.findElement(By.id("create-project-description")).sendKeys("random");

        const selectElement = await driver.findElement(By.id("create-project-option"));
        await selectElement.click();

        await driver.sleep(1000);

        const optionToSelect = await driver.findElement(By.xpath(`//mat-option//span[contains(text(), 'KNN AI')]`));
        await optionToSelect.click();

        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.sleep(1000);

        const project = await driver.findElement(By.id(name));
        const isProjectDisplayed = await project.isDisplayed();


        if (isProjectDisplayed) {
            console.log("Das Projekt wurde ertellt, wie erwartet.");
        } else {
            console.log("Das Projekt konnte nicht erstellt werden, was nicht erwartet wurde.");
        }

    } catch (error) {
        console.error("Während des Tests ist ein Fehler aufgetreten:", error);
    } finally {
        await driver.quit();
    }

}

