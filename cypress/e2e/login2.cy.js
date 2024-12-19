const resourcesLogin = require('../resources/login');

describe('Login', () => {
  before(() => {
    cy.fixture('user.json').then((user) => {
      cy.wrap(user).as('user'); // Usando cy.wrap() para "linkar" com o Cypress
    });
  });

  it('Login com sucesso usando massa da fixture declarada no before com wrap', function () {
    cy.visit('/');
    cy.get(resourcesLogin.emailInput).type(this.user.email);
    cy.get(resourcesLogin.passwordInput).type(this.user.senha);
    cy.get(resourcesLogin.accessButton).click();

    cy.get(resourcesLogin.toastLoginStatus)
      .should('be.visible')
      .and('have.text', 'Login realizado com sucesso!');
  });
});
