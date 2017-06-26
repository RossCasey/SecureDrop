const SqliteConnector = require('./Connectors/Sqlite');

module.exports = {
  init: () => {
    const driver = process.env.DB_DRIVER || 'sqlite';

    switch (driver) {
      case 'sqlite':
        return SqliteConnector();
      default:
        throw new Error('No such database');
    }
  }
}
