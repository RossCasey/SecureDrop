const shortid = require('shortid');

module.exports = (db) => {
  return {

    create(cipherText) {
      const id = shortid.generate();
      return db.drop.create(id, cipherText).then(() => {
        return Promise.resolve(id);
      }).catch((err) => {
        return Promise.reject(err);
      })
    },

    get(id) {
      return db.drop.get(id).then((data) => {
        if( ! data) {
          return Promise.resolve();
        }
        return db.drop.claim(id).then(() => {
          return Promise.resolve(data.cipherText);
        });
      }).catch((err) => {
        return Promise.reject(err); 
      })
    }
  }
}
