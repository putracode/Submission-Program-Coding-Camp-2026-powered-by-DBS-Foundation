import { nanoid } from "nanoid";
import pool from "../../../config/database.js";
import bcrypt from "bcrypt";
import { text } from "express";
import CacheService from "../../../cache/redis-service.js";

class UserRepository {
  constructor() {
    this._pool = pool;
    this.cacheService = new CacheService();
  }

  async create({ name, email, password, role }) {
    const id = nanoid(16);
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: "INSERT INTO users (id, name, email, password, role) VALUES($1, $2, $3, $4, $5) RETURNING id",
      values: [id, name, email, hashedPassword, role],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async findById(id) {
    const cacheKey = `user:${id}`;

    try {
      const user = await this.cacheService.get(cacheKey);
      return { user: JSON.parse(user), source: "cache" };
    } catch (error) {
      const query = {
        text: "SELECT * FROM users WHERE id = $1",
        values: [id],
      };

      const result = await this._pool.query(query);
      if (result.rows[0] !== undefined) {
        await this.cacheService.set(cacheKey, JSON.stringify(result.rows[0]));
      }
      return { user: result.rows[0], source: "database" };
    }
  }

  async verifyEmail(email) {
    const query = {
      text: "SELECT email FROM users WHERE email = $1",
      values: [email],
    };

    const result = await this._pool.query(query);
    return result.rows.length > 0;
  }

  async verifyCredentials(email, password) {
    const query = {
      text: "SELECT id, password FROM users WHERE email = $1",
      values: [email],
    };

    const user = await this._pool.query(query);

    if (!user.rows.length) {
      return null;
    }

    const { id, password: hashedPassword } = user.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      return null;
    }

    return id;
  }
}

export default new UserRepository();
