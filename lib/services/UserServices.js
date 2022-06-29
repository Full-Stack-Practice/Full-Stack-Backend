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
};
