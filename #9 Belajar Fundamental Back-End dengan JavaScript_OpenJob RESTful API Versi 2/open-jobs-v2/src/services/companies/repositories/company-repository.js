import { nanoid } from "nanoid";
import pool from "../../../config/database.js";
import CacheService from "../../../cache/redis-service.js";
import { AuthorizationError, NotFoundError } from "../../../exceptions/index.js";

class CompanyRepository {
  constructor() {
    this._pool = pool;
    this.cacheService = new CacheService();
  }

  async create({ name, user_id, location, description }) {
    const id = nanoid(16);

    const query = {
      text: "INSERT INTO companies (id, user_id, name, location, description) VALUES($1, $2, $3, $4, $5) RETURNING id",
      values: [id, user_id, name, location, description],
    };

    const result = await this._pool.query(query);
    await this.cacheService.delete("companies");
    return result.rows[0];
  }

  async findAll() {
    const cacheKey = "companies";

    try {
      const result = await this.cacheService.get(cacheKey);
      const source = "cache";
      return { companies: JSON.parse(result), source };
    } catch (error) {
      const query = {
        text: "SELECT * FROM companies",
      };

      const result = await this._pool.query(query);
      const source = "database";
      await this.cacheService.set(cacheKey, JSON.stringify(result.rows));
      return { companies: result.rows, source };
    }
  }

  async findById(id) {
    const cacheKey = `company:${id}`;

    try {
      const company = await this.cacheService.get(cacheKey);

      return { company: JSON.parse(company), source: "cache" };
    } catch (error) {
      const query = {
        text: "SELECT * FROM companies WHERE id = $1",
        values: [id],
      };

      const result = await this._pool.query(query);

      if (result.rows[0] !== undefined) {
        await this.cacheService.set(cacheKey, JSON.stringify(result.rows[0]));
      }

      return { company: result.rows[0], source: "database" };
    }
  }

  async update({ id, name, location, description }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: "UPDATE companies SET name = $1, location = $2, description = $3, updated_at = $4 WHERE id = $5 RETURNING id",
      values: [name, location, description, updatedAt, id],
    };

    const result = await this._pool.query(query);
    await this.cacheService.delete(`company:${id}`);
    await this.cacheService.delete("companies");
    return result.rows[0];
  }

  async delete(id) {
    const query = {
      text: "DELETE FROM companies WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);
    await this.cacheService.delete(`company:${id}`);
    await this.cacheService.delete("companies");
    return result.rows[0]?.id;
  }

  async verifyCompanyOwner(id, userId) {
    const { company } = await this.findById(id);

    if (!company) {
      throw new NotFoundError("Company tidak ditemukan");
    }

    if (company.user_id !== userId) {
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
    }
  }
}

export default new CompanyRepository();
