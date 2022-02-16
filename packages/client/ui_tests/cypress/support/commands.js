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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress.on("fail", () => {});

Cypress.Commands.add('getHomeIcon', () => cy.get('h5').contains('Movies'));

Cypress.Commands.add('checkHomeIcon', () => cy.getHomeIcon().should('exist'));

Cypress.Commands.add('getLogoutButton', () => cy.get('#logout'));

Cypress.Commands.add('checkLogoutButton', () => cy.getLogoutButton().should('exist'));

Cypress.Commands.add('checkNavBar', () => {
  cy.checkHomeIcon();
  cy.checkLogoutButton();
});
