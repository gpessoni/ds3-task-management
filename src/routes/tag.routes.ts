import { Router } from "express";
import tagController from "../controllers/tag.controller";
import { checkTagExists } from "../middlewares/tag.middleware";
import { isAuthenticated } from "../middlewares/user.middleware";

const router = Router();

router.post("/", isAuthenticated, tagController.create);
router.get("/", isAuthenticated, tagController.getAll);
router.get("/:id", isAuthenticated, checkTagExists, tagController.getById);
router.put("/:id", isAuthenticated, checkTagExists, tagController.update);
router.delete("/:id", isAuthenticated, checkTagExists, tagController.delete);

export default router;

