const express = require('express');
const bodyParser = require('body-parser');
const DropRouter = require('./Routers/DropRouter');
const path = require('path');

module.exports = (db) => {

  const app = express();

  app.use(bodyParser.json({limit: '16kb'}));
  app.use(express.static('public'));
  app.use('/api/v1/drop', DropRouter(db));

  if(process.env.APP_ENV === 'development') {
    app.use('/test', express.static('test/client/index.html'));
    app.use('/test/script.js', express.static('test/client/test-bundle.js'));
  }

  app.use('/', express.static('src/client/public'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
  });

  return app;
};
