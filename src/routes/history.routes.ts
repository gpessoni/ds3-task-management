import { Router } from "express";
import historyController from "../controllers/history.controller";
import { isAuthenticated } from "../middlewares/user.middleware";

const router = Router();

router.get("/:taskId", isAuthenticated, historyController.getByTaskId);

export default router;
