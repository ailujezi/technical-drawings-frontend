describe('projectdetails tests', () => {
    /* ==== Test Created with Cypress Studio ==== */
    it('project_details', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.getAccessToken().then(token => {
        cy.deleteAllProjects(token);
        cy.createProject('Test', 'Test Beschreibung', 1, token);
      });

    cy.login('123', '123');
    
    cy.get('[data-cy="projectlist-project-name"]').click();
    cy.get('[data-cy="project-name"]').should('have.text', 'Test');
    cy.get('[data-cy="project-description"]').should('have.text', 'Test Beschreibung');
    cy.get('[data-cy="project-isvisualized-no"]').should('have.text', 'Not yet visualized autorenew Visualisieren ');
    /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('upload_image', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.getAccessToken().then(token => {
            cy.deleteAllProjects(token);
            cy.createProject('Test', 'Test Beschreibung', 1, token);
          });
        cy.login('123','123');
        cy.get('[data-cy="projectlist-project-name"]').click();
        cy.get('[data-cy="project-img-upload-input"]').click();
        cy.get('input[type="file"]').selectFile('cypress/fixtures/bild_mit_text.png');
        cy.get('[data-cy="project-img-upload-button"]').click();
        cy.get('.delete-image-container > img').should('be.visible');
        /* ==== End Cypress Studio ==== */
    });

    it('delete_image', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.getAccessToken().then(token => {
            cy.deleteAllProjects(token);
            cy.createProject('Test', 'Test Beschreibung', 1, token);

          });
        cy.login('123','123');
        cy.get('[data-cy="projectlist-project-name"]').click();
        cy.get('[data-cy="project-img-upload-input"]').click();
        cy.get('input[type="file"]').selectFile('cypress/fixtures/bild_mit_text.png');
        cy.get('[data-cy="project-img-upload-button"]').click();

        cy.get('[data-cy="project-gallery-img-delete"]').click();
        cy.get('[data-cy="delete-image-button-yes"]').click();
        cy.get('.delete-image-container > img').should('not.exist');
        /* ==== End Cypress Studio ==== */
    });
});