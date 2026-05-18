import Joi from "joi";

export const createSchema = Joi.object({
  user_id: Joi.string().required(),
  job_id: Joi.string().required(),
});
