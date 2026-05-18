import { Pool } from "pg";

class ApplicationService {
  constructor() {
    this._pool = new Pool();
  }

  async getApplication(applicationId) {
    const query = {
      text: `
      SELECT
          applicants.name AS applicant_name,
          applicants.email AS applicant_email,
          owners.email AS job_owner_email,
          applications.created_at AS application_date
      FROM applications
      JOIN users AS applicants
          ON applications.user_id = applicants.id
      JOIN jobs
          ON applications.job_id = jobs.id
      JOIN companies
          ON jobs.company_id = companies.id
      JOIN users AS owners
        ON companies.user_id = owners.id
      WHERE applications.id = $1
      `,
      values: [applicationId],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }
}
export default ApplicationService;
