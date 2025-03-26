import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import { validateId } from "../validations/config.validation";
import jwt from "jsonwebtoken";

export const checkUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idValidation = validateId(req.params.id);
  if (idValidation.error) {
    return res.status(400).json({ message: idValidation.message });
  }

  const userId = Number(req.params.id);
  const existingUser = await userService.getById(userId);

  if (!existingUser) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }
  next();
};

export const isAuthenticated = async (
  req: any,
  res: Response, 
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Token não fornecido ou formato inválido." });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

export const checkSelfAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(req.params.id);
  const tokenUserId = (req.user as any).id;

  if (userId !== tokenUserId) {
    return res.status(403).json({ 
      message: "Você só pode realizar ações em seu próprio usuário." 
    });
  }

  next();
};
