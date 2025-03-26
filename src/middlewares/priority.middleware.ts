import { Request, Response, NextFunction } from "express";
import priorityService from "../services/priority.service";
import { validateId } from "../validations/config.validation";

export const validatePriorityExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idValidation = validateId(req.params.id);
  if (idValidation.error) {
    return res.status(400).json({ message: idValidation.message });
  }

  const priorityId = req.params.id;
  const existingPriority = await priorityService.getPriorityById(priorityId);

  if (!existingPriority) {
    return res.status(404).json({ message: "Prioridade não encontrada." });
  }
  next();
};
