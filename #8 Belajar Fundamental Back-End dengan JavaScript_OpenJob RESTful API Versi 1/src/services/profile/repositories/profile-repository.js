import { Pool } from "pg";

class ProfileRepository {
  constructor() {
    this._pool = new Pool();
  }

  async findById(user_id) {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [user_id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async findApplications(user_id) {
    const query = {
      text: "SELECT * FROM applications WHERE user_id = $1",
      values: [user_id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async findBookmarks(user_id) {
    const query = {
      text: "SELECT * FROM bookmarks WHERE user_id = $1",
      values: [user_id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

export default new ProfileRepository();
