import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

export const updateSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});
