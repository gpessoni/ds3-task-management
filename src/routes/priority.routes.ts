import { Router } from "express";
import priorityController from "../controllers/priority.controller";
import { validatePriorityExists } from "../middlewares/priority.middleware";
import { isAuthenticated } from "../middlewares/user.middleware";

const router = Router();

router.post("/", isAuthenticated, priorityController.create);
router.get("/", isAuthenticated, priorityController.getAll);
router.get("/:id", isAuthenticated, validatePriorityExists, priorityController.getById);
router.put("/:id", isAuthenticated, validatePriorityExists, priorityController.update);
router.delete("/:id", isAuthenticated, validatePriorityExists, priorityController.delete);

export default router;
