const Router = require('express').Router;
const DropController = require('../Controllers/DropController');
const createValidator = require('../Validators/Drop/create');

module.exports = (db) => {

  const router = Router();
  const drop = DropController(db);

  router.post('/', createValidator, (req, res) => {
    drop.create(req.body.cipherText).then((id) => {
      res.json({id: id});
    }).catch((err) => {
      res.status(500).json({error: 'internal error'});
    })
  });

  router.get('/:id', (req, res) => {
    drop.get(req.params.id).then((cipherText) => {
      if( ! cipherText) {
        res.status(404).json({error: 'drop not found'});
      }
      res.json({cipherText: cipherText});
    }).catch((err) => {
      res.status(500).json({error: 'internal error'});
    })
  });

  return router;
};
