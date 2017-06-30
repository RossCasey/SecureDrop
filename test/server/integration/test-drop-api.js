const request = require('supertest');
const App = require('../../../src/server/app');
const assert = require('assert');

describe('Drop API', () => {

  it('should return id when POST called on /drop', () => {

    const db = {
      drop: {
        create(id, cipherText) {
          return Promise.resolve();
        }
      }
    }

    const app = App(db);

    return request(app)
      .post('/api/v1/drop')
      .send({cipherText: 'cipherText'})
      .expect(200)
      .then((response) => {
        assert.ok(response.body.id);
      });
  });

  it('should return an error when POST called on /drop with invalid request JSON', () => {
    const app = App({});

    return request(app)
      .post('/api/v1/drop')
      .expect(400)
      .then((response) => {
        assert.strictEqual(response.body.error, 'Invalid request');
      });
  });

  it('should return cipher text when GET is called on /drop/:id', () => {

      const db = {
        drop: {
          get(id) {
            return Promise.resolve({cipherText: "def"});
          },
          claim(id) {
            return Promise.resolve();
          }
        }
      }

      const app = App(db);

      return request(app)
        .get('/api/v1/drop/abc')
        .expect(200)
        .then((response) => {
          assert.strictEqual(response.body.cipherText, 'def');
        });
  });

  it('should return error when GET is called on /drop', () => {

    const app = App({});

    return request(app)
      .get('/api/v1/drop')
      .expect(404);
  })

  it('should be able to return cipherText for just created drop', () => {
    const db = {
      _cipherText: null,
      drop: {
        create(id, cipherText) {
          _cipherText = cipherText;
          return Promise.resolve()
        },
        get(id) {
          return Promise.resolve({cipherText: _cipherText})
        },
        claim(id) { return Promise.resolve() }
      }
    }

    const app = App(db);

    const agent = request(app);

    return agent
      .post('/api/v1/drop')
      .send({cipherText: 'def'})
      .expect(200)
      .then((response) => {
        return agent
          .get('/api/v1/drop/' + response.body.id)
          .expect(200)
          .then((response) => {
            assert.ok(response.body.cipherText === 'def');
          });
      });
  });

  it('should return 500 if the database throws an error during GET /drop/:id', () => {
    const db = {
      drop: {
        get(id) {
          return Promise.reject(new Error('error'));
        }
      }
    }

    const app = App(db);

    return request(app)
      .get('/api/v1/drop/abc')
      .expect(500)
      .then((response) => {
        assert.ok(response.body.error.includes('internal'));
      });
  });

  it('should return 404 if the database return empty promise for GET /drop/:id', () => {
    const db = {
      drop: {
        get(id) {
          return Promise.resolve();
        }
      }
    };

    const app = App(db);

    return request(app)
      .get('/api/v1/drop/abc')
      .expect(404)
      .then((response) => {
        assert.ok(response.body.error.includes('drop not found'));
      });
  });

  it('should return 500 if the database throws an error during POST /drop', () => {
    const db = {
      drop: {
        create(id, cipherText) {
          return Promise.reject(new Error('err'));
        }
      }
    };

    const app = App(db);

    return request(app)
      .post('/api/v1/drop')
      .send({cipherText: 'def'})
      .expect(500)
      .then((response) => {
        assert.ok(response.body.error.includes('internal'));
      });
  });
});
