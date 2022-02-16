/// <reference types="cypress" />
// EXAMPLE

import { IFlowHelper } from './../../IFlowHelper';

export class IssueChartHelper implements IFlowHelper {
  getRoot() {
    return cy.get('#issue-chart');
  }

  checkFlow(): void {
    this.checkForm();
  }

  checkForm(): void {
    this.getRoot().scrollIntoView();
    this.checkLabels();
    this.hoverOverBars();
    this.toggleBarGraphFilters();
  }

  checkLabels(): void {
    [
      'Blocked',
      'Prioritized',
      'In Progress',
      'Awaiting PR Review',
      'Not Fixed',
      'Testing',
      'Ready For Production',
    ].forEach(label => this.getRoot().find('tspan').contains(label).should('exist'));
    this.getRoot().find('g.apexcharts-grid').should('exist');
    this.getRoot().find('g[class="apexcharts-xaxis apexcharts-yaxis-inversed"]').should('exist');
    this.getRoot().find('g[class="apexcharts-bar-series apexcharts-plot-series"]').should('exist');
    this.getRoot().find('g.apexcharts-series').should('exist');
    this.getRoot().find('g.apexcharts-datalabels').should('exist');
  }

  hoverOverBars() {
    [
      // red bars
      'path[fill="rgba(217,83,79,0.85)"]',
      // blue bars
      'path[fill="rgba(66,139,202,0.85)"]',
      // purple bars
      'path[fill="rgba(162,149,214,0.85)"]',
      // green bars
      'path[fill="rgba(168,214,149,0.85)"]',
      // gray bars
      'path[fill="rgba(112,128,144,0.85)"]',
    ].forEach(bar => this.getRoot().find(bar).click({ multiple: true, force: true }));
    // .each((bar) => {
    //   // expect(bar.prop("filter")).to.be.undefined;
    //   bar.click();
    //   // expect(bar.prop("filter")).to.not.be.undefined;
    //   // expect(bar.prop("selected")).to.eq("true");
    //   bar.click();
    //   cy.wait(200);
    // });
  }

  toggleBarGraphFilters() {
    const labels = ['Bug', 'Enhancement', 'Task', 'Form', 'Visual Tweak', 'Other'];
    labels.forEach(l => {
      this.getRoot().find('span[class="apexcharts-legend-text"]').contains(l).parent().as('graphToggle').click();
      cy.get('@graphToggle').invoke('attr', 'data:collapsed').should('contain', 'true');
      cy.get('@graphToggle').click();
      cy.get('@graphToggle').invoke('attr', 'data:collapsed').should('contain', 'false');
    });
  }
}
