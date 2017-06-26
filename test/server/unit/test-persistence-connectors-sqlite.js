const assert = require('assert');
const Sqlite = require('../../../src/server/Persistence/Connectors/Sqlite');
const fs = require('fs');
const moment = require('moment');

describe('Sqlite', () => {

  before(() => {
    process.env.DB_MIGRATE = true;
    process.env.DB_MIGRATE_FORCE = true;
  });

  afterEach(() => {
    return new Promise((resolve, reject) => {
      fs.unlink('./database.sqlite', (err) => {
        if(err) return reject(err);
        return resolve();
      });
      resolve();
    });
  })

  describe('create', () => {
    it('should create a drop', () => {
      let _db;
      return Sqlite().then((db) => {
        _db = db;
        return _db.drop.create('abc', 'def');
      }).then(() => {
        return _db.drop.get('abc');
      }).then((data) => {
        assert.strictEqual(data.id, 'abc');
        assert.strictEqual(data.cipherText, 'def');
        assert.ok(data.created);
      });
    });
  });

  describe('get', () => {
    it('should return undefined if drop id does not exist', () => {
      return Sqlite().then((db) => {
        return db.drop.get('abc');
      }).then((data) => {
        assert.strictEqual(data, undefined);
      });
    });

    it('should return undefined if a drop exists but it is marked as claimed', () => {
      let _db;
      return Sqlite().then((db) => {
        _db = db;
        return _db.drop.create('abc', 'def');
      }).then(() => {
        return _db.drop.claim('abc');
      }).then(() => {
        return _db.drop.get('abc');
      }).then((data) => {
        assert.strictEqual(data, undefined);
      });
    });

    it('should return undefined if a drop exists but it is 1 day old', () => {
      let _db;
      return Sqlite().then((db) => {
        _db = db;
        let time = moment().subtract({days: 1, hour: 0}).format('X');
        let data = {':id':'abc', ':cipherText':'def', ':time':time};
        return _db.drop.raw('INSERT INTO drops(id, cipherText, created) VALUES(:id, :cipherText, :time)', data);
      }).then(() => {
        return _db.drop.get('abc');
      }).then((data) => {
        assert.strictEqual(data, undefined);
      });
    });

    it('should return data if a drop is exactly 1 day minus 1 second old', () => {
      let _db;
      return Sqlite().then((db) => {
        _db = db;
        let time = moment().subtract({hours: 23, minutes: 59, seconds: 59}).format('X');
        let data = {':id':'abc', ':cipherText':'def', ':time':time};
        return _db.drop.raw('INSERT INTO drops(id, cipherText, created) VALUES(:id, :cipherText, :time)', data);
      }).then(() => {
        return _db.drop.get('abc');
      }).then((data) => {
        assert.ok(data);
      });
    })
  });
});
