const DB = require('./Persistence/database');
require('dotenv').config();
const App = require('./app');

const port = process.env.PORT || 3000;

DB.init().then((db) => {
  App(db).listen(port, () => {
      console.log(`Secure Drop running on port ${port}`);
  }); 
});
