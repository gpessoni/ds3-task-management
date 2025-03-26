import Joi from "joi";

const createTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "O título deve ser uma string.",
    "string.empty": "O título é obrigatório.",
    "any.required": "O título é obrigatório."
  }),
  description: Joi.string().messages({
    "string.base": "A descrição deve ser uma string."
  }),
  priorityId: Joi.number().required().messages({
    "number.base": "A prioridade deve ser um número.",
    "any.required": "A prioridade é obrigatória."
  }),
  creatorId: Joi.number().required().messages({
    "number.base": "O criador deve ser um número.",
    "any.required": "O criador é obrigatório."
  })
});

const updateTaskSchema = Joi.object({
  title: Joi.string().messages({
    "string.base": "O título deve ser uma string."
  }),
  description: Joi.string().messages({
    "string.base": "A descrição deve ser uma string."
  }),
  priorityId: Joi.number().messages({
    "number.base": "A prioridade deve ser um número."
  }),
  status: Joi.string().valid('PENDENTE', 'EM_PROGRESSO', 'CONCLUIDO').messages({
    "string.base": "O status deve ser uma string.",
    "any.only": "O status deve ser PENDENTE, EM_PROGRESSO ou CONCLUIDO"
  })
});

export { createTaskSchema, updateTaskSchema }