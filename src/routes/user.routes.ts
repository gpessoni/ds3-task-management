import { Router } from "express";
import userController from "../controllers/user.controller";
import { checkUserExists } from "../middlewares/user.middleware";
import { isAuthenticated } from "../middlewares/user.middleware";
import { checkSelfAction } from "../middlewares/user.middleware";

const router = Router();

router.post("/login", userController.login);

router.get("/", userController.getAll);
router.get("/:id", checkUserExists, userController.getById);
router.post("/", userController.create);
router.put("/:id", isAuthenticated, checkUserExists, checkSelfAction, userController.update);
router.delete("/:id", isAuthenticated, checkUserExists, checkSelfAction, userController.delete);
router.put("/:id/avatar", isAuthenticated, checkUserExists, checkSelfAction, userController.uploadAvatar);

export default router;