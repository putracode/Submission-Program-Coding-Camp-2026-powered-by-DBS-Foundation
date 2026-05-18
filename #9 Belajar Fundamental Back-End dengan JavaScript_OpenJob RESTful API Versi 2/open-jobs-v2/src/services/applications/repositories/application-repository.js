import { nanoid } from "nanoid";
import pool from "../../../config/database.js";
import CacheService from "../../../cache/redis-service.js";
import { InvariantError } from "../../../exceptions/index.js";

class ApplicationRepository {
  constructor() {
    this._pool = pool;
    this.cacheService = new CacheService();
  }

  async create({ user_id, job_id, status }) {
    const id = nanoid(16);
    const query = {
      text: "INSERT INTO applications(id, user_id, job_id, status) VALUES($1, $2, $3, $4) RETURNING *",
      values: [id, user_id, job_id, status],
    };

    const result = await this._pool.query(query);
    await this.cacheService.delete(`applications-user:${user_id}`);
    await this.cacheService.delete(`applications-job:${job_id}`);
    return result.rows[0];
  }

  async verifyApplication(user_id, job_id) {
    const query = {
      text: "SELECT * FROM applications WHERE user_id = $1 AND job_id = $2",
      values: [user_id, job_id],
    };

    const result = await this._pool.query(query);
    if (result.rows.length > 0) {
      throw new InvariantError("Application sudah ada");
    }
  }

  async findAll() {
    const query = {
      text: `
      SELECT applications.id, applications.user_id, applications.job_id, users.name, users.email, jobs.title, jobs.description, jobs.job_type, jobs.experience_level, jobs.location_type, jobs.location_city, jobs.salary_min, jobs.salary_max
      FROM applications
      JOIN users ON applications.user_id = users.id
      JOIN jobs ON applications.job_id = jobs.id
      `,
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const cacheKey = `application:${id}`;
    try {
      const application = await this.cacheService.get(cacheKey);
      return { application: JSON.parse(application), source: "cache" };
    } catch (error) {
      const query = {
        text: "SELECT * FROM applications WHERE id = $1",
        values: [id],
      };

      const result = await this._pool.query(query);

      if (result.rows[0] !== undefined) {
        await this.cacheService.set(cacheKey, JSON.stringify(result.rows[0]));
      }
      return { application: result.rows[0], source: "database" };
    }
  }

  async findByUser(id) {
    const cacheKey = `applications-user:${id}`;
    try {
      const applications = await this.cacheService.get(cacheKey);
      return { applications: JSON.parse(applications), source: "cache" };
    } catch (error) {
      const query = {
        text: "SELECT * FROM applications WHERE user_id = $1",
        values: [id],
      };

      const result = await this._pool.query(query);

      if (result.rows !== undefined) {
        await this.cacheService.set(cacheKey, JSON.stringify(result.rows));
      }
      return { applications: result.rows, source: "database" };
    }
  }

  async findByJob(id) {
    const cacheKey = `applications-job:${id}`;
    try {
      const applications = await this.cacheService.get(cacheKey);
      return { applications: JSON.parse(applications), source: "cache" };
    } catch (error) {
      const query = {
        text: "SELECT * FROM applications WHERE job_id = $1",
        values: [id],
      };

      const result = await this._pool.query(query);

      await this.cacheService.set(cacheKey, JSON.stringify(result.rows));
      return { applications: result.rows, source: "database" };
    }
  }

  async update(id, data) {
    const { application: existingApplication } = await this.findById(id);

    if (!existingApplication) {
      return null;
    }

    const updatedData = { ...existingApplication, ...data };
    const updatedAt = new Date().toISOString();

    const query = {
      text: "UPDATE applications SET user_id = $1, job_id = $2, status = $3, updated_at = $4 WHERE id = $5 RETURNING id",
      values: [updatedData.user_id, updatedData.job_id, updatedData.status, updatedAt, id],
    };

    const result = await this._pool.query(query);
    if (result.rows.length) {
      await this.cacheService.delete(`application:${id}`);
      await this.cacheService.delete(`applications-user:${updatedData.user_id}`);
      await this.cacheService.delete(`applications-job:${updatedData.job_id}`);
    }
    return result.rows[0];
  }

  async delete(id) {
    const query = {
      text: "DELETE FROM applications WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);
    await this.cacheService.delete(`application:${id}`);
    return result.rows[0];
  }
}

export default new ApplicationRepository();
