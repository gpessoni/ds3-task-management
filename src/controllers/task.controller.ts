import { Request, Response } from "express";
import { createTaskSchema, updateTaskSchema } from "../validations/task.validation";
import taskService from "../services/task.service";
import { validateId } from "../validations/config.validation";
import { handleError } from "../utils/errorHandler";

class TaskController {
  async create(req: Request, res: Response) {
    try {
      const { error } = createTaskSchema.validate(req.body);
      if (error) {
        return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
      }

      const { title, description, priorityId, creatorId, responsibleId, status } = req.body;

      const task = await taskService.create({
        title,
        description,
        priorityId,
        creatorId,
        responsibleId,
        status
      });
      return res.status(201).json(task);
    } catch (error: any) {
      return handleError(res, error, "Erro ao criar a tarefa");
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tasks = await taskService.getAll();
      return res.json(tasks);
    } catch (error) {
      return handleError(res, error as Error, "Erro ao buscar as tarefas");
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validation = validateId(id);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      const task = await taskService.getById(Number(id));
      if (!task) {
        return handleError(res, new Error("Tarefa não encontrada"), "Tarefa não encontrada", 404);
      }

      return res.json(task);
    } catch (error) {
      return handleError(res, error as Error, "Erro ao buscar a tarefa");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validation = validateId(id);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      const { error } = updateTaskSchema.validate(req.body);
      if (error) {
        return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
      }

      const { title, description, priorityId, status } = req.body;

      const updatedTask = await taskService.update(Number(id), {
        title,
        description,
        priorityId,
        status
      });
      return res.json(updatedTask);
    } catch (error: any) {
      return handleError(res, error, "Erro ao atualizar a tarefa");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validation = validateId(id);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      await taskService.delete(Number(id));
      return res.status(204).send();
    } catch (error) {
      return handleError(res, error as Error, "Erro ao deletar a tarefa");
    }
  }

  async assignResponsible(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { responsibleId } = req.body;

      const validation = validateId(id);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      const updatedTask = await taskService.assignResponsible(Number(id), Number(responsibleId));
      return res.json(updatedTask);
    } catch (error: any) {
      return handleError(res, error, "Erro ao atribuir responsável à tarefa");
    }
  }

  async getByPriority(req: Request, res: Response) {
    try {
      const { priorityId } = req.params;

      const validation = validateId(priorityId);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      const tasks = await taskService.getByPriority(Number(priorityId));
      return res.json(tasks);
    } catch (error) {
      return handleError(res, error as Error, "Erro ao buscar tarefas por prioridade");
    }
  }

  async getByResponsible(req: Request, res: Response) {
    try {
      const { responsibleId } = req.params;

      const validation = validateId(responsibleId);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      const tasks = await taskService.getByResponsible(Number(responsibleId));
      return res.json(tasks);
    } catch (error) {
      return handleError(res, error as Error, "Erro ao buscar tarefas por responsável");
    }
  }

  async getByCreator(req: Request, res: Response) {
    try {
      const { creatorId } = req.params;

      const validation = validateId(creatorId);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      const tasks = await taskService.getByCreator(Number(creatorId));
      return res.json(tasks);
    } catch (error) {
      return handleError(res, error as Error, "Erro ao buscar tarefas por criador");
    }
  }

  async getByTag(req: Request, res: Response) {
    try {
      const { tagId } = req.params;

      const validation = validateId(tagId);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      const tasks = await taskService.getByTag(Number(tagId));
      return res.json(tasks);
    } catch (error) {
      return handleError(res, error as Error, "Erro ao buscar tarefas por tag");
    }
  }


}

export default new TaskController();
