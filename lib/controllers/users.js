const { Router } = require('express');
const UserService = require('../services/UserServices');
const authenticate = require('../middleware/Authenticate');

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
        .cookie(process.env.COOKIE_NAME, token, { 
          httpOnly: true, 
          secure: false, 
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24 
        })
        .json({ message: 'Signed in successfully!' });
    }
    catch (e) {
      next(e);
    }
  })
  .get('/currentUser', authenticate, async (req, res) => {
    res.json(req.user);
  })
  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME, { 
        httpOnly: true, 
        secure: false, 
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 
      })
      .json({ success: true, message: 'Signed out Successfully!' })
      .status(204)
      .send();
  })
;
