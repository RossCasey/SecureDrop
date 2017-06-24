const express = require('express');
const bodyParser = require('body-parser');
const DropRouter = require('./Routers/DropRouter');
const db = require('sqlite');

module.exports = (db) => {

  const app = express();

  app.use(bodyParser.json({limit: '16kb'}));
  app.use(express.static('public'));
  app.use('/api/v1/drop', DropRouter(db));

  return app;
}
