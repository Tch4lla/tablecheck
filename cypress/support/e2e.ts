declare global {
  namespace Cypress {
    interface Chainable {
      produceSSRResponse: () => Chainable;
    }
  }
}

Cypress.Commands.add("produceSSRResponse", async () => {});
