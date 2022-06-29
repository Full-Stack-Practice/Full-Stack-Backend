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
;
