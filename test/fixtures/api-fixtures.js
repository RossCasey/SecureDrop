const db = require('sqlite');

module.exports = {

  createInMemoryDb: () => {
    return Promise.resolve()
      .then(() => db.open(':memory:', { Promise }))
      .then(() => db.migrate({ force: 'last'}))
      .then(() => {
        return Promise.resolve(db);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

}
