const DB = require('./src/Persistence/database');
require('dotenv').config();
const App = require('./src/app');

DB.init().then((db) => {
  App(db).listen(3000);
});
