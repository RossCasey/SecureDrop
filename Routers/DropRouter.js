const Router = require('express').Router;
const DropController = require('../Controllers/DropController');
const createValidator = require('../Validators/Drop/create');

module.exports = (db) => {

  const router = Router();
  const drop = DropController(db);

  router.post('/', createValidator, (req, res) => {
    drop.create('test').then((id) => {
      res.json({id: id});
    })
  });

  router.get('/:id', (req, res) => {
    drop.get(req.params.id)
    .then((cipherText) => {
      if( ! cipherText) {
        //404
      }
      res.json({cipherText: cipherText});
    })
    .catch((err) => {
      //500
    })
  });

  return router;
};
