const request = require('supertest');
const App = require('../../app');
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
      .post('/drop')
      .send({cipherText: 'cipherText'})
      .expect(200)
      .then((response) => {
        assert.ok(response.body.id);
      });
  });

  it('should return an error when POST called on /drop with invalid request JSON', () => {
    const app = App({});

    return request(app)
      .post('/drop')
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
        .get('/drop/abc')
        .expect(200)
        .then((response) => {
          assert.strictEqual(response.body.cipherText, 'def');
        });
  });

  it('should be able to return cipherText for just created drop', () => {

    const db = 12;


  });
});
