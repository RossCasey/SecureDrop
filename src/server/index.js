const DB = require('./Persistence/database');
require('dotenv').config();
const App = require('./app');

DB.init().then((db) => {
  App(db).listen(3000);
});
