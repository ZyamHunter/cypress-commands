describe('Login', () => {
  before(() => {
    cy.fixture('user.json').then((user) => {
      cy.wrap(user).as('user');
    });
  });

  it('Login com sucesso usando métodos declarados no commands', function () {
    cy.visit('/');
    cy.doLogin(this.user.email, this.user.senha);
    cy.checkMessage('Login realizado com sucesso!');
  });
});
