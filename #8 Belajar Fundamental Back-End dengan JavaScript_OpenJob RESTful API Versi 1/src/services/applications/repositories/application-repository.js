import { nanoid } from "nanoid";
import { Pool } from "pg";

class ApplicationRepository {
  constructor() {
    this._pool = new Pool();
  }

  async create({ user_id, job_id, status }) {
    const id = nanoid(16);
    const query = {
      text: "INSERT INTO applications(id, user_id, job_id, status) VALUES($1, $2, $3, $4) RETURNING id",
      values: [id, user_id, job_id, status],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async findAll() {
    const query = {
      text: "SELECT * FROM applications",
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = {
      text: "SELECT * FROM applications WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async findByUser(id) {
    const query = {
      text: "SELECT * FROM applications WHERE user_id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async findByJob(id) {
    const query = {
      text: "SELECT * FROM applications WHERE job_id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async update(id, data) {
    const existingApplication = await this.findById(id);

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
    return result.rows[0];
  }

  async delete(id) {
    const query = {
      text: "DELETE FROM applications WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default new ApplicationRepository();
