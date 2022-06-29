const { Router } = require('express');
const Album = require('../models/Album');
const authenticate = require('../middleware/Authenticate');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const allAlbums = await Album.getAll(req.user.id);
      
      res.json(allAlbums);
    } catch(e) {
      next(e);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newAlbum = await Album.insert(req.body);
      res.json(newAlbum);
    } catch(e) {
      next(e);
    }
  })
  .put('/:id', authenticate, async (req, res, next) => {
    try {
      const updatedAlbum = await Album.update(req.params.id, req.body);
      res.json(updatedAlbum);
    } catch(e) {
      next(e);
    }
  })
;
