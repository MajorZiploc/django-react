// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command
     * @example
     */
    getHomeIcon(): Chainable<Element>;

    checkHomeIcon(): Chainable<Element>;

    getLogoutButton(): Chainable<Element>;

    checkLogoutButton(): Chainable<Element>;

    checkNavBar(): Chainable<Element>;
  }
}
