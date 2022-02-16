/// <reference types="cypress" />

import { IFlowHelper } from '../../IFlowHelper';

export class MovieTableHelper implements IFlowHelper {
  getRoot() {
    return cy.get('#moviesTable');
  }

  checkFlow(): void {
    this.checkForm();
  }

  checkForm(): void {
    this.getRoot().scrollIntoView();
    this.checkLabels();
  }

  checkLabels(): void {
    ['Title', 'Genre', 'Year'].forEach(label => this.getRoot().find('th').contains(label).should('exist'));
  }
}
