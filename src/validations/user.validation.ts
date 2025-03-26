import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "O nome deve ser uma string.",
    "string.empty": "O nome é obrigatório.", 
    "any.required": "O nome é obrigatório.",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "O email deve ser uma string.",
    "string.empty": "O email é obrigatório.",
    "string.email": "O email deve ser válido.",
    "any.required": "O email é obrigatório.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "A senha deve ser uma string.",
    "string.empty": "A senha é obrigatória.",
    "string.min": "A senha deve ter no mínimo 6 caracteres.",
    "any.required": "A senha é obrigatória.",
  })
});

const updateUserSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": "O nome deve ser uma string.",
  }),
  email: Joi.string().email().messages({
    "string.base": "O email deve ser uma string.",
    "string.email": "O email deve ser válido.",
  }),
  password: Joi.string().min(6).messages({
    "string.base": "A senha deve ser uma string.", 
    "string.min": "A senha deve ter no mínimo 6 caracteres.",
  })
});

export { createUserSchema, updateUserSchema }