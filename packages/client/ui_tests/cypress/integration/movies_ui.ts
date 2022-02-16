/// <reference types="cypress" />

import { LiveEnv } from '../support/UIEnvHelpers';
import { MovieTableHelper } from './../support/TestHelpers/UITestHelpers';

describe('movies', () => {
  const envHelper = new LiveEnv();
  const movieTable = new MovieTableHelper();

  before('Logs into movies', function () {
    envHelper.login();
  });

  [
    {
      label: 'Successful login flow',
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
