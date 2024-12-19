const resourcesLogin = require('../resources/login');

describe('Login', () => {
  let massa;

  before(() => {
    cy.fixture('user.json').then((dados) => {
      massa = dados;
    });
  });

  it('Login com sucesso', () => {
    cy.visit('/');
    cy.get(resourcesLogin.emailInput).type('user@teste.com');
    cy.get(resourcesLogin.passwordInput).type('Teste@123!');
    cy.get(resourcesLogin.accessButton).click();

    cy.get(resourcesLogin.toastLoginStatus)
      .should('be.visible')
      .and('have.text', 'Login realizado com sucesso!');
  });

  it('Login com sucesso com com massa definida em constante', () => {
    const user = {
      email: 'user@teste.com',
      senha: 'Teste@123!',
    };

    cy.visit('/');
    cy.get(resourcesLogin.emailInput).type(user.email);
    cy.get(resourcesLogin.passwordInput).type(user.senha);
    cy.get(resourcesLogin.accessButton).click();

    cy.get(resourcesLogin.toastLoginStatus)
      .should('be.visible')
      .and('have.text', 'Login realizado com sucesso!');
  });

  it('Login com sucesso usando massa da fixture', () => {
    cy.fixture('user.json').then((user) => {
      JSON.stringify(user);

      cy.visit('/');
      cy.get(resourcesLogin.emailInput).type(user.email);
      cy.get(resourcesLogin.passwordInput).type(user.senha);
      cy.get(resourcesLogin.accessButton).click();

      cy.get(resourcesLogin.toastLoginStatus)
        .should('be.visible')
        .and('have.text', 'Login realizado com sucesso!');
    });
  });

  it('Login com sucesso usando massa da fixture no before', () => {
    cy.visit('/');
    cy.get(resourcesLogin.emailInput).type(massa.email);
    cy.get(resourcesLogin.passwordInput).type(massa.senha);
    cy.get(resourcesLogin.accessButton).click();

    cy.get(resourcesLogin.toastLoginStatus)
      .should('be.visible')
      .and('have.text', 'Login realizado com sucesso!');
  });

  // Cenários com erro no login

  it('Login com email incorreto', () => {
    cy.visit('/');
    cy.get(resourcesLogin.emailInput).type('email_incorreto@teste.com');
    cy.get(resourcesLogin.passwordInput).type(massa.senha);
    cy.get(resourcesLogin.accessButton).click();

    cy.get(resourcesLogin.toastLoginStatus)
      .should('be.visible')
      .and(
        'have.text',
        'Erro ao acessar, verifique suas credenciais de acesso!',
      );
  });

  it('Login com senha incorreta', () => {
    cy.visit('/');
    cy.get(resourcesLogin.emailInput).type(massa.email);
    cy.get(resourcesLogin.passwordInput).type('SenhaErrada123!');
    cy.get(resourcesLogin.accessButton).click();

    cy.get(resourcesLogin.toastLoginStatus)
      .should('be.visible')
      .and(
        'have.text',
        'Erro ao acessar, verifique suas credenciais de acesso!',
      );
  });

  it('Login com email e senha incorretos', () => {
    cy.visit('/');
    cy.get(resourcesLogin.emailInput).type('email_errado@teste.com');
    cy.get(resourcesLogin.passwordInput).type('SenhaErrada123!');
    cy.get(resourcesLogin.accessButton).click();

    cy.get(resourcesLogin.toastLoginStatus)
      .should('be.visible')
      .and(
        'have.text',
        'Erro ao acessar, verifique suas credenciais de acesso!',
      );
  });

  it('Login com campo de email inválido', () => {
    cy.visit('/');
    cy.get(resourcesLogin.emailInput).type('email_errado.teste.com');
    cy.get(resourcesLogin.passwordInput).type(massa.senha);
    cy.get(resourcesLogin.accessButton).click();

    cy.get(resourcesLogin.inputMessageError)
      .should('be.visible')
      .and('have.text', 'Por favor, insira um e-mail válido.');

    cy.get(resourcesLogin.toastLoginStatus)
      .should('be.visible')
      .and('have.text', 'Preencha os campos corretamente!');
  });

  it('Login com campo de email vazio', () => {
    cy.visit('/');
    cy.get(resourcesLogin.passwordInput).type(massa.senha);
    cy.get(resourcesLogin.accessButton).click();

    cy.get(resourcesLogin.inputMessageError)
      .should('be.visible')
      .and('have.text', 'O campo de e-mail é obrigatório.');

    cy.get(resourcesLogin.toastLoginStatus)
      .should('be.visible')
      .and('have.text', 'Preencha os campos corretamente!');
  });

  it('Login com campo de senha vazio', () => {
    cy.visit('/');
    cy.get(resourcesLogin.emailInput).type(massa.email);
    cy.get(resourcesLogin.accessButton).click();

    cy.get(resourcesLogin.inputMessageError)
      .should('be.visible')
      .and('have.text', 'O campo de senha é obrigatório.');

    cy.get(resourcesLogin.toastLoginStatus)
      .should('be.visible')
      .and('have.text', 'Preencha os campos corretamente!');
  });

  it('Login com campos de email e senha vazios', () => {
    cy.visit('/');
    cy.get(resourcesLogin.accessButton).click();

    cy.get(resourcesLogin.inputMessageError)
      .eq(0)
      .should('be.visible')
      .and('have.text', 'O campo de e-mail é obrigatório.');

    cy.get(resourcesLogin.inputMessageError)
      .eq(1)
      .should('be.visible')
      .and('have.text', 'O campo de senha é obrigatório.');

    cy.get(resourcesLogin.toastLoginStatus)
      .should('be.visible')
      .and('have.text', 'Preencha os campos corretamente!');
  });
});
