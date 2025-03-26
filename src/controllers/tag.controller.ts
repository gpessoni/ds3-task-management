import { Request, Response } from "express";
import { createTagSchema, updateTagSchema } from "../validations/tag.validation";
import tagService from "../services/tag.service";
import { validateId, validateUpdateBody, isValidHexColor } from "../validations/config.validation";
import { handleError } from "../utils/errorHandler";


class TagController {
  async create(req: Request, res: Response) {
    try {
      const { error } = createTagSchema.validate(req.body);
      if (error) {
        return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
      }

      const { name, color } = req.body;

      if (!isValidHexColor(color)) {
        return handleError(res, new Error("Cor inválida"), "A cor deve estar no formato hexadecimal válido (ex: #FFFFFF ou #FFF)", 400);
      }

      const tag = await tagService.create({ name, color }); 
      return res.status(201).json(tag);
    } catch (error: any) {
      if (error.code === "TAG_EXISTS") {
        return handleError(res, error, error.message, 400);
      }
      return handleError(res, error, "Erro ao criar a tag");
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tags = await tagService.getAll();
      return res.json(tags);
    } catch (error) {
      return handleError(res, error as Error, "Erro ao buscar as tags");
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validation = validateId(id);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      const tag = await tagService.getById(Number(id));
      if (!tag) {
        return handleError(res, new Error("Tag não encontrada"), "Tag não encontrada", 404);
      }

      return res.json(tag);
    } catch (error) {
      return handleError(res, error as Error, "Erro ao buscar a tag");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const validation = validateId(id);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      const { error } = updateTagSchema.validate(req.body);
      if (error) {
        return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
      }

      const { name, color } = req.body;

      if (color && !isValidHexColor(color)) {
        return handleError(res, new Error("Cor inválida"), "A cor deve estar no formato hexadecimal válido (ex: #FFFFFF ou #FFF)", 400);
      }

      const updatedTag = await tagService.update(Number(id), name, color);
      return res.json(updatedTag);
    } catch (error: any) {
      if (error.code === "TAG_EXISTS") {
        return handleError(res, error, error.message, 400);
      }
      return handleError(res, error, "Erro ao atualizar a tag");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validation = validateId(id);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      await tagService.delete(Number(id));
      return res.status(204).send();
    } catch (error) {
      return handleError(res, error as Error, "Erro ao deletar a tag");
    }
  }
}

export default new TagController();
