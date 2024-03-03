describe('projectlist tests', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('testProjectlistToggle', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4200');
    cy.get('#login-form > :nth-child(1) > .ng-untouched').clear('12');
    cy.get('#login-form > :nth-child(1) > .ng-untouched').type('123');
    cy.get(':nth-child(2) > .ng-untouched').click();
    cy.get('.ng-untouched').clear();
    cy.get('.ng-untouched').type('123');
    cy.get('.mdc-button__label').click();
    cy.get('.mat-mdc-tab-group').should('be.visible');
    cy.get('.mdc-button__label').should('be.visible');
    cy.get('.mat-icon').click();
    cy.get('.mdc-button__label').should('not.exist');
    cy.get('.mat-icon').click();
    cy.get('.mdc-button__label').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('TestCreateProject', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4200');
    cy.get('#login-form > :nth-child(1) > .ng-untouched').clear('12');
    cy.get('#login-form > :nth-child(1) > .ng-untouched').type('123');
    cy.get(':nth-child(2) > .ng-untouched').click();
    cy.get('.ng-untouched').clear();
    cy.get('.ng-untouched').type('123');
    cy.get('.mdc-button__label').click();
    cy.get('.mdc-button__label').click();
    cy.get('#create-project-name').clear();
    cy.get('#create-project-name').type('test');
    cy.get('#create-project-description').click();
    cy.get('#create-project-description').type('test beschreibung');
    cy.get('#create-project-select').click();
    cy.get('[ng-reflect-message="Simple AI using k nearest neig"]').click();
    cy.get('#create-project-form > .mdc-button > .mdc-button__label').click();
    cy.get('#test > .mdc-list-item__content > .mat-mdc-list-item-line').should('have.text', 'test beschreibung ');
    /* ==== End Cypress Studio ==== */
  });
});