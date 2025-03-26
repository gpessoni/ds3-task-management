import Joi from "joi";

const createTagSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "O nome deve ser uma string.",
    "string.empty": "O nome é obrigatório.",
    "any.required": "O nome é obrigatório.",
  })
});

const updateTagSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": "O nome deve ser uma string.",
  })
});

export { updateTagSchema, createTagSchema }