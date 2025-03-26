import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validateId } from "../validations/config.validation";
import { createTagSchema, updateTagSchema } from "../validations/tag.validation";
import tagService from "../services/tag.service";

const prisma = new PrismaClient();

class TagController {
  async create(req: Request, res: Response) {
    try {
      const { error } = createTagSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { name } = req.body;
      const tag = await tagService.create(name);
      return res.status(201).json(tag);
    } catch (error: any) {
      if (error.code === "TAG_EXISTS") {
        return res.status(400).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tags = await tagService.getAll();
      return res.json(tags);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getById(req: Request, res: Response) {
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

      return res.json(tag);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const validation = validateId(id);
      if (validation.error) {
        return res.status(400).json({ message: validation.message });
      }

      const { error } = updateTagSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { name } = req.body;
      const updatedTag = await tagService.update(Number(id), name);
      return res.json(updatedTag);
    } catch (error: any) {
      if (error.code === "TAG_EXISTS") {
        return res.status(400).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validation = validateId(id);
      if (validation.error) {
        return res.status(400).json({ message: validation.message });
      }

      await tagService.delete(Number(id));
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default new TagController();
