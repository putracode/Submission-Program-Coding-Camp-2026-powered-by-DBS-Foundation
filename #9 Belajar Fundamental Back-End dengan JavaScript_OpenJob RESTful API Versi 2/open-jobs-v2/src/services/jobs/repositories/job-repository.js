import { nanoid } from "nanoid";
import pool from "../../../config/database.js";

class JobRepository {
  constructor() {
    this._pool = pool;
  }

  async create({
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  }) {
    const id = nanoid(16);

    const query = {
      text: `INSERT INTO jobs (
        id, company_id, category_id, title, description, 
        job_type, experience_level, location_type, location_city, 
        salary_min, salary_max, is_salary_visible, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
      values: [
        id,
        company_id,
        category_id,
        title,
        description,
        job_type,
        experience_level,
        location_type,
        location_city,
        salary_min,
        salary_max,
        is_salary_visible,
        status,
      ],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
  
  async findAll({ title, category, company, location } = {}) {
    let queryText = `
      SELECT jobs.*, companies.name as company_name, categories.name as category_name 
      FROM jobs 
      LEFT JOIN companies ON jobs.company_id = companies.id 
      LEFT JOIN categories ON jobs.category_id = categories.id 
      WHERE 1=1
    `;
    const queryValues = [];

    if (title) {
      queryValues.push(`%${title}%`);
      queryText += ` AND jobs.title ILIKE $${queryValues.length}`;
    }

    if (category) {
      queryValues.push(category);
      queryText += ` AND (categories.name ILIKE $${queryValues.length} OR jobs.category_id = $${queryValues.length})`;
    }

    if (company) {
      queryValues.push(company);
      queryText += ` AND (companies.name ILIKE $${queryValues.length} OR jobs.company_id = $${queryValues.length})`;
    }

    if (location) {
      queryValues.push(`%${location}%`);
      queryText += ` AND jobs.location_city ILIKE $${queryValues.length}`;
    }

    queryText += " ORDER BY jobs.created_at DESC";

    const query = {
      text: queryText,
      values: queryValues,
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = {
      text: "SELECT * FROM jobs WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async findByCompany(id) {
    const query = {
      text: "SELECT * FROM jobs WHERE company_id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async findByCategory(id) {
    const query = {
      text: "SELECT * FROM jobs WHERE category_id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async update(id, data) {
    const existingJob = await this.findById(id);

    if (!existingJob) {
      return null;
    }

    const updatedData = { ...existingJob, ...data };
    const updatedAt = new Date().toISOString();

    const query = {
      text: `UPDATE jobs SET 
        company_id = $1, 
        category_id = $2, 
        title = $3, 
        description = $4, 
        job_type = $5, 
        experience_level = $6, 
        location_type = $7, 
        location_city = $8, 
        salary_min = $9, 
        salary_max = $10, 
        is_salary_visible = $11, 
        status = $12, 
        updated_at = $13 
        WHERE id = $14 RETURNING id`,
      values: [
        updatedData.company_id,
        updatedData.category_id,
        updatedData.title,
        updatedData.description,
        updatedData.job_type,
        updatedData.experience_level,
        updatedData.location_type,
        updatedData.location_city,
        updatedData.salary_min,
        updatedData.salary_max,
        updatedData.is_salary_visible,
        updatedData.status,
        updatedAt,
        id,
      ],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async delete(id) {
    const query = {
      text: "DELETE FROM jobs WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default new JobRepository();
