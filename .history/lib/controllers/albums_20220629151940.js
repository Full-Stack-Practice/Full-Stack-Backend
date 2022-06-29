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
;
