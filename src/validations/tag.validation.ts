import Joi from "joi";

const createTagSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "O nome deve ser uma string.",
    "string.empty": "O nome é obrigatório.", 
    "any.required": "O nome é obrigatório.",
  }),
  color: Joi.string().required().messages({
    "string.base": "A cor deve ser uma string.",
    "string.empty": "A cor é obrigatória.",
    "any.required": "A cor é obrigatória.",
  })
});

const updateTagSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": "O nome deve ser uma string.",
  }),
  color: Joi.string().messages({
    "string.base": "A cor deve ser uma string.",
  })
});

export { updateTagSchema, createTagSchema }