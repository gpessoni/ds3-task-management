import { Request, Response } from "express";
import historyService from "../services/history.service";
import { validateId } from "../validations/config.validation";
import { handleError } from "../utils/errorHandler";

class HistoryController {
  async getByTaskId(req: Request, res: Response) {
    try {
      const { taskId } = req.params;

      const validation = validateId(taskId);
      if (validation.error) {
        return handleError(res, new Error(validation.error), validation.message, 400);
      }

      const history = await historyService.findByTaskId(Number(taskId));
      return res.json(history);
    } catch (error) {
      return handleError(res, error as Error, "Erro ao buscar histórico da tarefa");
    }
  }
}

export default new HistoryController();
