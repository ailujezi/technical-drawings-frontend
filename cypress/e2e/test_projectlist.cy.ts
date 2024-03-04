describe('projectlist tests', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('projectlist_toggle', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4200');
    cy.get('[data-cy="login-name-input"]').clear('12');
    cy.get('[data-cy="login-name-input"]').type('123');
    cy.get('[data-cy="login-password-input"]').clear('12');
    cy.get('[data-cy="login-password-input"]').type('123');
    cy.get('[data-cy="login-submit"]').click();
    cy.get('.mdc-button__label').should('be.visible');
    cy.get('[data-cy="header-toggle-projectlist"]').click();
    cy.get('.mdc-button__label').should('not.exist');
    cy.get('[data-cy="header-toggle-projectlist"]').click();
    cy.get('.mdc-button__label').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('create-project', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4200');
    cy.get('[data-cy="login-name-input"]').clear('12');
    cy.get('[data-cy="login-name-input"]').type('123');
    cy.get('[data-cy="login-password-input"]').clear('12');
    cy.get('[data-cy="login-password-input"]').type('123');
    cy.get('.mdc-button__label').click();
    cy.get('.mdc-button__label').click();
    cy.get('[data-cy="create-project-name"]').clear('T');
    cy.get('[data-cy="create-project-name"]').type('Test');
    cy.get('[data-cy="create-project-description"]').click();
    cy.get('[data-cy="create-project-description"]').type('Test Beschreibung');
    cy.get('.mat-mdc-select-trigger').click();
    cy.get('.mat-mdc-option-active > .mdc-list-item__primary-text').click();
    cy.get('[data-cy="create-project-form"] > .mdc-button > .mdc-button__label').click();
    cy.get('[data-cy="projectlist-project-description"]').should('have.text', 'Test Beschreibung ');
    /* ==== End Cypress Studio ==== */
  });
});

