/// <reference types="cypress" />

export class LiveEnv {
  username: string;
  password: string;
  constructor() {
    this.username = Cypress.env('username');
    this.password = Cypress.env('password');
  }

  login() {
    // for getting network api call data
    // cy.server();
    cy.visit('movies');
    // for getting network api call data
    // cy.intercept('**/auth/token').as('userinfo');
    cy.wait(3000)
      .url()
      .then(url => {
        if (url.match(/login/i) != null) {
          cy.get('#username')
            .type(this.username)
            .get('#password')
            .type(this.password, { log: false })
            .get('#logInButton')
            .click();
        } else {
          const msg = 'Already logged in.';
          cy.log(msg);
          expect(
            true,
            'Test needs to be rerun in a state where the user is logged out of the site in order to generate the auth token'
          ).to.be.false;
        }
      });
    // wait for api call data
    // cy.wait('@userinfo');
    cy.wait(200);
  }
}
