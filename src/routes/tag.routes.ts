import { Router } from "express";
import tagController from "../controllers/tag.controller";
import { checkTagExists } from "../middlewares/tag.middleware";

const router = Router();

router.post("/", tagController.create);
router.get("/", tagController.getAll);
router.get("/:id", checkTagExists, tagController.getById);
router.put("/:id", checkTagExists, tagController.update);
router.delete("/:id", checkTagExists, tagController.delete);

export default router;


