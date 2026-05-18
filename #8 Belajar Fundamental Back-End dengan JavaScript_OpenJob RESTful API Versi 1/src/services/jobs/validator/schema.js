import Joi from "joi";

export const createSchema = Joi.object({
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  job_type: Joi.string().required(),
  experience_level: Joi.string().optional(),
  location_type: Joi.string().optional(),
  location_city: Joi.string().optional(),
  salary_min: Joi.number().optional(),
  salary_max: Joi.number().optional(),
  is_salary_visible: Joi.boolean().default(true),
  status: Joi.string(),
});

export const updateSchema = Joi.object({
  company_id: Joi.string(),
  category_id: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  job_type: Joi.string(),
  experience_level: Joi.string(),
  location_type: Joi.string(),
  location_city: Joi.string(),
  salary_min: Joi.number().integer(),
  salary_max: Joi.number().integer(),
  is_salary_visible: Joi.boolean(),
  status: Joi.string(),
}).min(1);
