const express = require('express');
const { createMockMiddleware } = require('openapi-mock-express-middleware');


  const app = express();

  app.use(
    '/api', // root path for the mock server
    createMockMiddleware({ spec: 'C:\\Users\\Sulay\\foo\\cypress\\support\\openapi.json' }),
  );

  app.listen(9001, () => console.log('Server listening on port 9001'));


