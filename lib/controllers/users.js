const { Router } = require('express');
const UserService = require('../services/UserServices');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  })
  .post('/sessions', async (req, res, next) => {

    try {
      const user = await UserService.login(req.body);
      res.json(user);
    }
    catch (e) {
      next(e);
    }
  })
;
