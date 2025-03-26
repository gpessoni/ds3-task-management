import { Request, Response } from "express";
import priorityService from "../services/priority.service";
import { createPrioritySchema, updatePrioritySchema } from "../validations/priority.validation";
import { handleError } from "../utils/errorHandler";
import { validateId, validateUpdateBody } from "../validations/config.validation";

class PriorityController {
  async create(req: Request, res: Response) {
    const { error } = createPrioritySchema.validate(req.body);
    if (error) {
      return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
    }

    try {
      const priority = await priorityService.createPriority(req.body);
      return res.status(201).json(priority);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao criar a prioridade.");
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const priorities = await priorityService.getPriorities();
      return res.json(priorities);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao buscar as prioridades.", 400);
    }
  }

  async getById(req: Request, res: Response) {
    const idValidation = validateId(req.params.id);
    if (idValidation.error) {
      return handleError(res, new Error(idValidation.error), idValidation.message, 400);
    }
  
    try {
      const priority = await priorityService.getPriorityById(req.params.id);
      if (!priority) {
        return handleError(res, new Error("Prioridade não encontrada."), "Prioridade não encontrada.", 404);
      }
      return res.json(priority);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao buscar a prioridade.", 500);
    }
  }
  
  async update(req: Request, res: Response) {
    const idValidation = validateId(req.params.id);
    if (idValidation.error) {
      return handleError(res, new Error(idValidation.error), idValidation.message, 400);
    }

    const bodyValidation = validateUpdateBody(req.body);
    if (bodyValidation.error) {
      return handleError(res, new Error(bodyValidation.error), bodyValidation.message, 400);
    }

    const { error } = updatePrioritySchema.validate(req.body);
    if (error) {
      return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
    }

    try {
      const priority = await priorityService.getPriorityById(req.params.id);
      if (!priority) {
        return handleError(res, new Error("Prioridade não encontrada."), "Prioridade não encontrada.", 404);
      }
      
      if (priority.default) {
        return handleError(res, new Error("Não é possível alterar uma prioridade padrão."), "Operação não permitida", 403);
      }

      const updatedPriority = await priorityService.updatePriority(req.params.id, req.body);
      return res.json(updatedPriority);
    } catch (err) {
      return handleError(res, err as Error, "Erro ao atualizar a prioridade.", 400);
    }
  }

  async delete(req: Request, res: Response) {
    const idValidation = validateId(req.params.id);
    if (idValidation.error) {
      return handleError(res, new Error(idValidation.error), idValidation.message, 400);
    }

    try {
      const priority = await priorityService.getPriorityById(req.params.id);
      if (!priority) {
        return handleError(res, new Error("Prioridade não encontrada."), "Prioridade não encontrada.", 404);
      }

      if (priority.default) {
        return handleError(res, new Error("Não é possível excluir uma prioridade padrão."), "Operação não permitida", 403);
      }

      await priorityService.deletePriority(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return handleError(res, err as Error, "Erro ao deletar a prioridade.", 400);
    }
  }
}

export default new PriorityController();
