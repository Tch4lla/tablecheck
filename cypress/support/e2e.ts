declare global {
  namespace Cypress {
    interface Chainable {
      produceSSRResponse: () => Chainable;
    }
  }
}

import axios from "axios";
Cypress.Commands.add("produceSSRResponse",  () => {
  cy.request({
    method: 'GET',
    url: 'http://localhost:9001/api/custom',
  }).as('setup').then((response) => {
    const post = response.body
    return post
  });
});
 