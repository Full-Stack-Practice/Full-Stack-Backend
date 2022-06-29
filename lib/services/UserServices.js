const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ username, email, password }) {
    if(email.length <= 8) {
      throw new Error('invalid email');
    }

    if(password.length < 6) {
      throw new Error('invalid password');
    }

    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      username,
      email,
      passwordHash,
    });

    return user;
  }

  static async login({ email, password = '' }) {

    try{
      const user = await User.getByEmail(email);
      if(!user) {
        throw new Error('invalid email');
      }
      const isVaild = bcrypt.compare(password, user.passwordHash);

      if(!isVaild) {
        throw new Error('invalid password');
      }

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: '1d' });

      return token;
    } catch(e) {

      e.status = 401;
      throw e;

    }
  }
};
