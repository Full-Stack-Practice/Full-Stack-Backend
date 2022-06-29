const pool = require('../utils/pool');

module.exports = class Album {
  id;  
  album_name;
  artist;
  genre;
  release_date;
  user_id;

  constructor ({ id, album_name, artist, genre, release_date, user_id }) {
    this.id = id;
    this.album_name = album_name;
    this.artist = artist;
    this.genre = genre;
    this.release_date = release_date;
    this.user_id = user_id;
  }

  static async insert({ album_name, artist, genre, release_date, user_id }) {
    const { rows } = await pool.query('INSERT INTO albums (album_name, artist, genre, release_date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [album_name, artist, genre, release_date, user_id]);
    return new Album(rows[0]);
  }

  static async getAll(user_id) {
    const { rows } = await pool.query('SELECT * FROM albums WHERE user_id = $1 ORDER BY album_name', [user_id]);
    return rows.map(row => new Album(row));
  }

};
