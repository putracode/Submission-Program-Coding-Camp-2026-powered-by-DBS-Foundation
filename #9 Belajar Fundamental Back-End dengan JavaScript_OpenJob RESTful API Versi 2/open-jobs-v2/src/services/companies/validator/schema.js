import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  location: Joi.string().required(),
  description: Joi.string().min(10).required(),
});

export const updateSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  location: Joi.string(),
  description: Joi.string().min(10),
}).min(1);
