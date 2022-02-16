/// <reference types="cypress" />

import { LiveEnv } from '../support/UIEnvHelpers';
import { MovieTableHelper } from './../support/TestHelpers/UITestHelpers';
import { variable, string } from 'json-test-utility';

function toLabel(str: string) {
  return string.titleCase('Check ' + str) ?? 'No Label';
}

describe('movies', () => {
  const envHelper = new LiveEnv();
  const movieTable = new MovieTableHelper();

  before('Logs into movies', function () {
    envHelper.login();
  });

  [
    {
      label: toLabel(variable.splitCamelCase({ movieTable: movieTable }) ?? ''),
      flowhelper: movieTable,
    },
  ].forEach(t => {
    it(t.label, () => {
      t.flowhelper.checkFlow();
      cy.checkNavBar();
    });
  });

  after('Logout from the site', () => {
    cy.getLogoutButton().click();
  });
});
