const resourcesHome = require('../resources/home');

describe('Home', () => {
  it('Acessar Home', () => {
    cy.visit('/');
    cy.get(resourcesHome.home);
  });
});
