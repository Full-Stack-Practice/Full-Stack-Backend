const pool = require('../utils/pool');

module.exports = class User {
  id;
  username;
  email;
  #passwordHash;

  constructor ({ id, username, email, password_hash }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.#passwordHash = password_hash;
  }

  static async insert({ username, email, passwordHash }) {
    const { rows } = await pool.query('INSERT INTO users (username, email, password_hash) values ($1, $2, $3) RETURNING *', [username, email, passwordHash]);
    return new User(rows[0]);
  }

};
