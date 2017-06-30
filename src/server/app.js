const express = require('express');
const bodyParser = require('body-parser');
const DropRouter = require('./Routers/DropRouter');

module.exports = (db) => {

  const app = express();

  app.use(bodyParser.json({limit: '16kb'}));
  app.use(express.static('public'));
  app.use('/api/v1/drop', DropRouter(db));

  if(process.env.APP_ENV === 'development') {
    app.use('/test', express.static('test/client/index.html'));
    app.use('/test/script.js', express.static('test/client/test-bundle.js'));
  }

  return app;
};
