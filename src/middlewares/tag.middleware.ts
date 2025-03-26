import { Request, Response, NextFunction } from "express";
import { validateId } from "../validations/config.validation"
import tagService from "../services/tag.service";

export async function checkTagExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const validation = validateId(id);
        if (validation.error) {
            return res.status(400).json({ message: validation.message });
        }

        const tag = await tagService.getById(Number(id));
        if (!tag) {
            return res.status(404).json({ message: "Tag não encontrada" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}
