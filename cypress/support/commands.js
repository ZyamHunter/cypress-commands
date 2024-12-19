const resourcesLogin = require('../resources/login');

Cypress.Commands.add('doLogin', (email, senha) => {
  cy.get(resourcesLogin.emailInput).type(email);
  cy.get(resourcesLogin.passwordInput).type(senha);
  cy.get(resourcesLogin.accessButton).click();
});

Cypress.Commands.add('checkMessage', (message) => {
  cy.get(resourcesLogin.toastLoginStatus)
    .should('be.visible')
    .and('have.text', message);
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
