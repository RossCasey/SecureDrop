const assert = require('assert');
const DropController = require('../../../src/server/Controllers/DropController');
const sinon = require('sinon');

describe('DropController', () => {

  describe('create', () => {

    it('should call create on the database with a generated id and the given ciphertext', () => {
      const db = {
        drop: {
          create: sinon.stub().returns(Promise.resolve())
        }
      };

      const dropController = DropController(db);

      return dropController.create("abc").then(() => {
        assert.ok(db.drop.create.called);
        assert.ok(db.drop.create.calledWith(sinon.match.any, "abc"));
      });
    });

    it('should call return a rejected promise if the database return rejected promise', () => {
      const db = {
        drop: {
          create() {
            return Promise.reject(new Error('error'));
          }
        }
      };

      const dropController = DropController(db);

      return dropController.create("abc").then(() => {
        return Promise.reject(new Error('should not get here'));
      }).catch((err) => {
        assert.strictEqual(err.message, 'error');
      });
    });
  });

  describe('get', () => {

    it('should call get and claim on the database when get called with id', () => {
      const db = {
        drop: {
          get: sinon.stub().returns(Promise.resolve({cipherText: 'def'})),
          claim: sinon.stub().returns(Promise.resolve())
        }
      };

      const dropController = DropController(db);

      return dropController.get('abc').then((cipherText) => {
        assert.strictEqual(cipherText, 'def');
        assert.ok(db.drop.get.called);
        assert.ok(db.drop.get.calledWith('abc'));
        assert.ok(db.drop.claim.called);
        assert.ok(db.drop.claim.calledWith('abc'));
      });
    });

    it('should return an empty promise if database returns empty promise', () => {
      const db = {
        drop: {
          get: sinon.stub().returns(Promise.resolve()),
          claim() {
            assert.ok(false, 'should not get here');
          }
        }
      };

      const dropController = DropController(db);

      return dropController.get('abc').then((cipherText) => {
        assert.ok(cipherText === undefined);
        assert.ok(db.drop.get.called);
        assert.ok(db.drop.get.calledWith('abc'));
      });
    });

    it('should return empty promise if database returns nothing', () => {
      const db = {
        drop: {
          get: sinon.stub().returns(Promise.resolve()),
          claim() { assert.ok(false, 'should not be called')}
        }
      };

      const dropController = DropController(db);

      return dropController.get('abc').then((cipherText) => {
        assert.ok(cipherText === undefined);
        assert.ok(db.drop.get.called);
        assert.ok(db.drop.get.calledWith('abc'));
      })
    });

    it('should return rejected promise if get throws error', () => {
      const db = {
        drop: {
          get() {
            return Promise.reject(new Error('error'));
          }
        }
      };

      const dropController = DropController(db);

      return dropController.get('abc').then((cipherText) => {
        return Promise.reject(new Error('should not get here'));
      }).catch((err) => {
        assert.strictEqual(err.message, 'error');
      });
    });

    it('should return rejected promise if claim returns rejected errors', () => {
      const db = {
        drop: {
          get: sinon.stub().returns(Promise.resolve({cipherText: 'def'})),
          claim() {
            return Promise.reject(new Error('error'));
          }
        }
      };

      const dropController = DropController(db);

      return dropController.get('abc').then((cipherText) => {
        return Promise.reject(new Error('should not get here'));
      }).catch((err) => {
        assert.ok(db.drop.get.called);
        assert.ok(db.drop.get.calledWith('abc'));
        assert.strictEqual(err.message, 'error');
      });
    });
  });
});
