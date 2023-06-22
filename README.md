# tablecheck-fullstack-ssr-take-home

## Background

At TableCheck, our B2C booking platform relies on isomorphic SSR to render content-rich html pages that are indexable by search engines and embeddable as iframes in the websites of our clients.

An important aspect of developing SSR apps is testing that data that must be fetched from a separate database and then rendered in react in the server is sent appropriately in the html response. We typically do this with cypress e2e tests that use a mock api server that obliges by the same OpenAPI contract of the real server. This helps keep our tests deterministic and free from real database-related flakiness in CI. However, in a cypress test, we are unable to modify the initial SSR response with `cy.intercept` (or any frontend runtime http mocking tool like `msw`) as the api requests for data occur in the server during the lifetime of the request, not during the frontend runtime.

## Requirements

- **Create a new repo using this one as a template, do not fork this repo.**
- Before implementing, checkout a new `development` branch from `main` and do all your work on `development`. **Do not commit any work to `main`**.
- The single main requirement of this take-home is to make all the e2e tests in `happyPath.spec.ts` pass.
  - In the test environment, the SSR server should point to http://localhost:9001 (see `.env/.test.env`) and the mock api server should serve a faked version of the json placeholder api described in the OpenAPI `spec.json` file.
  - Implement the `produceSSRResponse` custom cypress command in `cypress/support/e2e.ts`. You should see in the test implementation for the "_should display a custom post_" test that we expect the server to render a post with some custom data (title, body, userId). `produceSSRResponse` must be responsible for altering the api responses that occur in the express server such that the cypress test itself can declare what those api responses should be, thus allowing the test assertions on the html to pass.

## Additional Context

- In real life, we use react for isomorphic SSR. However, the point of this assessment is not to assess your react skills, so the SSR portion in the server does not use react.
- The jsonplaceholder API has a lot more endpoints and schemas. For the point of this exercise, it is not necessary to use all of them so we are using only a few endpoints and a single `Post` schema.
- Before implementing, look at the package.json scripts, most of them are premade for you.

## Evaluation Criteria

1. Functionality: the tests should pass.
2. Code Quality: the implementation should be clean, well-organized, follow industry standard typescript/javascript conventions and be easily extensible.
3. Delivery: the assessment should be completed in a reasonable amount of time.

## Other

It is recommended you do not waste time implementing a mock api server or http response intercept from scratch. Research some of these packages and use any of your choice

- https://github.com/readmeio/oas
- https://github.com/aleksandryackovlev/openapi-mock-express-middleware
- https://github.com/richardschneider/express-mung
- https://openapi.tools/#mock
