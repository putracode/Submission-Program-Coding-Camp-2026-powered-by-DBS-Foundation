import { nanoid } from "nanoid";
import pool from "../../../config/database.js";

class CategoryRepository {
  constructor() {
    this._pool = pool;
  }

  async create(name) {
    const id = nanoid(16);
    const query = {
      text: "INSERT INTO categories (id, name) VALUES($1, $2) RETURNING id",
      values: [id, name],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async findAll() {
    const query = {
      text: "SELECT * FROM categories",
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = {
      text: "SELECT * FROM categories WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async update({ id, name }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: "UPDATE categories SET name = $1, updated_at = $2 WHERE id = $3 RETURNING id",
      values: [name, updatedAt, id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async delete(id) {
    const query = {
      text: "DELETE FROM categories WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0]?.id;
  }
}

export default new CategoryRepository();
