import { nanoid } from "nanoid";
import { Pool } from "pg";

class BookmarkRepository {
  constructor() {
    this._pool = new Pool();
  }

  async create(user_id, job_id) {
    const id = nanoid(16);
    const query = {
      text: "INSERT INTO bookmarks (id, user_id, job_id) VALUES ($1, $2, $3) RETURNING id",
      values: [id, user_id, job_id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async findAll(user_id) {
    const query = {
      text: "SELECT * FROM bookmarks WHERE user_id = $1",
      values: [user_id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = {
      text: "SELECT * FROM bookmarks WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async delete(user_id, job_id) {
    const query = {
      text: "DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2 RETURNING id",
      values: [user_id, job_id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default new BookmarkRepository();
