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
      const token = await UserService.login(req.body);

      res
        .status(200)
        .cookie(process.env.COOKIE_NAME, token, { httpOnly: true, secure: process.env.SECURE_COOKIES === 'true', sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict', maxAge: 1000 * 60 * 60 * 24 })
        .json({ message: 'Signed in successfully!' });
    }
    catch (e) {
      next(e);
    }
  })
;
