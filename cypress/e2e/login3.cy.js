const resourcesLogin = require('../resources/login');

describe('Login', () => {
  let massa;

  before(async () => {
    massa = await cy.fixture('user.json');
  });

  it('Login com sucesso usando massa da fixture no before com async e await', async () => {
    cy.visit('/');
    cy.get(resourcesLogin.emailInput).type(massa.email);
    cy.get(resourcesLogin.passwordInput).type(massa.senha);
    cy.get(resourcesLogin.accessButton).click();

    cy.get(resourcesLogin.toastLoginStatus)
      .should('be.visible')
      .and('have.text', 'Login realizado com sucesso!');
  });
});
