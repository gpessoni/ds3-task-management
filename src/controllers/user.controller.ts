import { Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "../validations/user.validation";
import userService from "../services/user.service";
import { validateId } from "../validations/config.validation";
import { handleError } from "../utils/errorHandler";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const { error } = createUserSchema.validate(req.body);
      if (error) {
        return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
      }

      const { name, email, password } = req.body;
      const user = await userService.create({ name, email, password });
      return res.status(201).json(user);
    } catch (error: any) {
      if (error.code === "USER_EXISTS") {
        return handleError(res, error, error.message, 400);
      }
      return handleError(res, error, "Erro ao criar o usuário");
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (error) {
      return handleError(res, error as Error, "Erro ao buscar os usuários");
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validation = validateId(id);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      const user = await userService.getById(Number(id));
      if (!user) {
        return handleError(res, new Error("Usuário não encontrado"), "Usuário não encontrado", 404);
      }

      return res.json(user);
    } catch (error) {
      return handleError(res, error as Error, "Erro ao buscar o usuário");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const validation = validateId(id);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      const { error } = updateUserSchema.validate(req.body);
      if (error) {
        return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);
      }

      const { name, email, password } = req.body;
      const updatedUser = await userService.update(Number(id), { name, email, password });
      return res.json(updatedUser);
    } catch (error: any) {
      if (error.code === "USER_EXISTS") {
        return handleError(res, error, error.message, 400);
      }
      return handleError(res, error, "Erro ao atualizar o usuário");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validation = validateId(id);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      await userService.delete(Number(id));
      return res.status(204).send();
    } catch (error) {
      return handleError(res, error as Error, "Erro ao deletar o usuário");
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);
      return res.json(result);
    } catch (error: any) {
      if (error.code === "INVALID_CREDENTIALS") {
        return handleError(res, error, error.message, 401);
      }
      return handleError(res, error, "Erro ao realizar login");
    }
  }
}

export default new UserController();
