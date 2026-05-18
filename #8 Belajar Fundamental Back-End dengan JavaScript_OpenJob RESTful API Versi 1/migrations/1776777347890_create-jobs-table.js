/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("jobs", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    company_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: '"companies"',
      onDelete: "CASCADE",
    },
    category_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: '"categories"',
      onDelete: "CASCADE",
    },
    title: {
      type: "TEXT",
      notNull: true,
    },
    description: {
      type: "TEXT",
      notNull: true,
    },
    job_type: {
      type: "VARCHAR(20)",
      notNull: true,
    },
    experience_level: {
      type: "VARCHAR(20)",
      notNull: false,
    },
    location_type: {
      type: "VARCHAR(20)",
      notNull: false,
    },
    location_city: {
      type: "TEXT",
      notNull: false,
    },
    salary_min: {
      type: "INTEGER",
      notNull: false,
    },
    salary_max: {
      type: "INTEGER",
      notNull: false,
    },
    is_salary_visible: {
      type: "BOOLEAN",
      notNull: true,
      default: true,
    },
    status: {
      type: "VARCHAR(20)",
      notNull: true,
      default: "open",
    },
    created_at: {
      type: "TIMESTAMPTZ",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "TIMESTAMPTZ",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("jobs", "company_id");
  pgm.createIndex("jobs", "category_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("jobs");
};
