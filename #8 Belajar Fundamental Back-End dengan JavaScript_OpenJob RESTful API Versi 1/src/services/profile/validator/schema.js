import Joi from "joi";

export const updateSchema = Joi.object({
  name: Joi.string().min(3).max(50),
});
