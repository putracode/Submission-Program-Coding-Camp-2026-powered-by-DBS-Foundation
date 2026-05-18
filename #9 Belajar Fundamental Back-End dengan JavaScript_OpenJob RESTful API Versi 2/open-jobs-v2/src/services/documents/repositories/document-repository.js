import pool from "../../../config/database.js";
import { nanoid } from "nanoid";

class DocumentRepository {
  constructor() {
    this._pool = pool;
  }

  async create({ filename, originalName, size, userId }) {
    const id = nanoid(16);
    const query = {
      text: "INSERT INTO documents(id, filename, original_name, size, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
      values: [id, filename, originalName, size, userId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async findAll() {
    const query = {
      text: "SELECT * FROM documents",
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = {
      text: "SELECT * FROM documents WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async destroy(id) {
    const query = {
      text: "DELETE FROM documents WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default new DocumentRepository();
