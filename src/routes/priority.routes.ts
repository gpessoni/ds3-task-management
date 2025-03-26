import { Router } from "express";
import priorityController from "../controllers/priority.controller";
import { validatePriorityExists } from "../middlewares/priority.middleware";

const router = Router();

router.post("/", priorityController.create);
router.get("/", priorityController.getAll);
router.get("/:id", validatePriorityExists, priorityController.getById);
router.put("/:id", validatePriorityExists, priorityController.update);
router.delete("/:id", validatePriorityExists, priorityController.delete);

export default router;
