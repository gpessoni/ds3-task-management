import { Router } from "express";
import taskController from "../controllers/task.controller";
import { isAuthenticated } from "../middlewares/user.middleware";

const router = Router();

router.get("/", taskController.getAll);
router.get("/:id", taskController.getById);
router.post("/", isAuthenticated, taskController.create);
router.put("/:id", isAuthenticated, taskController.update);
router.delete("/:id", isAuthenticated, taskController.delete);
router.post("/:id/assign", isAuthenticated, taskController.assignResponsible);
router.get("/priority/:priorityId", isAuthenticated, taskController.getByPriority);
router.get("/responsible/:responsibleId", isAuthenticated, taskController.getByResponsible);
router.get("/creator/:creatorId", isAuthenticated, taskController.getByCreator);
router.get("/tag/:tagId", isAuthenticated, taskController.getByTag);

export default router;