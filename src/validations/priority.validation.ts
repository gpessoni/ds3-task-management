import Joi from "joi";

const createPrioritySchema = Joi.object({
  level: Joi.string().required().messages({
    "string.base": "O nível deve ser uma string.",
    "string.empty": "O nível é obrigatório.",
    "any.required": "O nível é obrigatório.",
  })
});

const updatePrioritySchema = Joi.object({
  level: Joi.string().messages({
    "string.base": "O nível deve ser uma string.",
  })
});

export { updatePrioritySchema, createPrioritySchema }