import { nanoid } from "nanoid";
import pool from "../../../config/database.js";
import CacheService from "../../../cache/redis-service.js";

class BookmarkRepository {
  constructor() {
    this._pool = pool;
    this.cacheService = new CacheService();
  }

  async create(user_id, job_id) {
    const id = nanoid(16);
    const query = {
      text: "INSERT INTO bookmarks (id, user_id, job_id) VALUES ($1, $2, $3) RETURNING id",
      values: [id, user_id, job_id],
    };

    const result = await this._pool.query(query);
    await this.cacheService.delete(`bookmarks:${user_id}`);
    return result.rows[0];
  }

  async findAll(user_id) {
    const cacheKey = `bookmarks:${user_id}`;
    try {
      const bookmarks = await this.cacheService.get(cacheKey);
      return { bookmarks: JSON.parse(bookmarks), source: "cache" };
    } catch (error) {
      const query = {
        text: `
        SELECT bookmarks.id, bookmarks.user_id, bookmarks.job_id, bookmarks.created_at, users.name, users.email, jobs.title, jobs.description, jobs.job_type, jobs.experience_level, jobs.location_type, jobs.location_city, jobs.salary_min, jobs.salary_max, jobs.is_salary_visible, jobs.status, jobs.category_id, jobs.company_id
        FROM bookmarks
        JOIN jobs ON bookmarks.job_id = jobs.id
        JOIN users ON bookmarks.user_id = users.id 
        WHERE user_id = $1`,
        values: [user_id],
      };

      const result = await this._pool.query(query);

      await this.cacheService.set(cacheKey, JSON.stringify(result.rows));
      return { bookmarks: result.rows, source: "database" };
    }
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
    await this.cacheService.delete(`bookmarks:${user_id}`);
    return result.rows[0];
  }
}

export default new BookmarkRepository();
