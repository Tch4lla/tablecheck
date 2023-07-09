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
    return (`
    <!doctype html>
    <html>
      <head>
        <link rel="shortcut icon" href="https://cdn0.tablecheck.com/common/images/favicons/tc/v1.0.0/apple-icon-precomposed.png" type="image/x-icon" />
        <title>Posts</title>
      </head>
      <body>
        <h2>Post</h2>
        <div data-testid="Single Post">
          <h3 data-testid="Post Title">${post.title}</h3>
          <p data-testid="Post Body">${post.body}</p>
          <p data-testid="Post Author">Author: ${post.userId}</p>

        </div>
      </body>
    </html>
    `)
  });
});
