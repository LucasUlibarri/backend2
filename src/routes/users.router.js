import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();
const userController = new UserController();

// Crear nuevo usuario
router.post("/register", (req, res) => userController.saveUser(req, res));

// Obtener usuarios
router.get("/", userController.getUsers);

// Obtener usuario x id
router.get("/id/:id", userController.getUserById);

// Actualizar usuario
router.put("/id/:id", userController.updateUserByID);

// Eliminar usuario
router.delete("/id/:id", userController.deleteUserByID);

export default router;
