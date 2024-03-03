describe('Login tests', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('TestLogin', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:4200');
    cy.get('#login-form > :nth-child(1) > .ng-untouched').clear('12');
    cy.get('#login-form > :nth-child(1) > .ng-untouched').type('123');
    cy.get(':nth-child(2) > .ng-untouched').click();
    cy.get('.ng-untouched').clear();
    cy.get('.ng-untouched').type('123');
    cy.get('.mdc-button__label').click();
    cy.get('.mat-mdc-tab-group').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });
}
);

/* ==== Test Created with Cypress Studio ==== */
it('loginTexts', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:4200');
  cy.get('#login-username').should('have.text', 'Username:');
  cy.get('#login-password').should('have.text', 'Password:');
  cy.get('.mdc-button__label').should('have.text', 'Anmelden');
  cy.get('a').should('have.text', 'Noch kein Konto?');
  /* ==== End Cypress Studio ==== */
});
