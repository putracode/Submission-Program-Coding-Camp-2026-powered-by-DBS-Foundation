import Joi from "joi";

export const createSchema = Joi.object({
  user_id: Joi.string().required(),
  job_id: Joi.string().required(),
  status: Joi.string().required(),
});

export const updateSchema = Joi.object({
  status: Joi.string().valid("pending", "accepted", "rejected").required(),
});
