/// <reference types="cypress" />

import { IEnvHelper } from "./IEnvHelper";

export class LocalEnv implements IEnvHelper {
  clientPort: string;
  serverPort: string;
  username: string;
  password: string;

  constructor() {
    this.clientPort = Cypress.env("clientPort");
    this.serverPort = Cypress.env("serverPort");
    this.username = Cypress.env("username");
    this.password = Cypress.env("password");
  }

  login() {
    cy.server();
    cy.visit("movies");
    cy.route("**/auth/token").as("userinfo");
    cy.wait(6000)
      .url()
      .then((url) => {
        if (url.match(/login/i) != null) {
          cy.get("#inputUserName")
            .type(this.username)
            .get("#inputPassword")
            .type(this.password, { log: false })
            .get('button[value="login"]')
            .click()
            .get('a[href*="/movies/"]');
        } else {
          const msg = "Already logged in.";
          cy.log(msg);
          expect(
            true,
            "Test needs to be rerun in a state where the user is logged out of the site in order to generate the auth token"
          ).to.be.false;
        }
      });
    // wait for site to initialize
    cy.wait("@userinfo");
    cy.wait(200);
  }
  
}
