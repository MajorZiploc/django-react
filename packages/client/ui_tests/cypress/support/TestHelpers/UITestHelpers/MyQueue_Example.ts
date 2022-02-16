/// <reference types="cypress" />
// EXAMPLE

import { IFlowHelper } from '../../IFlowHelper';

export class MyQueue implements IFlowHelper {
  moviesUsername: string;
  constructor() {
    this.moviesUsername = Cypress.env('moviesUsername');
  }

  getRoot() {
    return cy.get('#my-queue');
  }

  checkFlow(): void {
    this.checkForm();
  }

  checkForm(): void {
    this.getRoot().scrollIntoView();
    this.checkLabels();
    this.searchmoviesUser();
  }

  checkLabels(): void {
    // My Queue root labels
    this.getRoot().find('.card-header').contains('My Queue').should('exist');
    this.getRoot().find('.username').contains('moviesUser:').should('exist');
    this.getRoot().find('.username button').contains('Edit').should('exist');
  }

  checkSubFormLabels(): void {
    this.getRoot().find('.card-header').contains('My Queue').should('exist');
    this.getRoot().find('.username').contains('moviesUser:').should('exist');
    // Check new labels.
    this.getRoot().find('input[placeholder="Username"]').as('input').should('exist');
    this.getRoot().find('.username button').contains('Save').as('save').should('exist');
    this.getRoot().find('button').contains('Cancel').as('cancel').should('exist');
  }

  searchmoviesUser(): void {
    this.getRoot().find('.username button').contains('Edit').as('edit').click();
    this.checkSubFormLabels();
    cy.get('@input').type(this.moviesUsername);
    cy.get('@save').click();
    this.getRoot()
      .find('div.list-group')
      .find('div.list-group-item')
      .find('span.badge-dark')
      .each(e => {
        expect(e.text().match(/^\d+$/), 'Check that issue number is a number.').to.not.be.null;
      });
    cy.get('@edit').click();
    this.checkSubFormLabels();
  }
}
