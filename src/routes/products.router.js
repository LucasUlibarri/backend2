import { Router } from "express";
import passport from "passport";
import ProductController from "../controllers/product.controller.js";
import { requireRole } from "../auth.middleware.js";

const router = Router();
const prodControl = new ProductController();

// Nuevo producto (ADMIN)
router.post("/", passport.authenticate("jwt", { session: false }), requireRole("ADMIN"), prodControl.create);

// Obtener productos
router.get("/", prodControl.getAll);

// Obtener producto x ID
router.get("/id/:id", prodControl.getById);

// Actualizar producto (ADMIN)
router.put("/id/:id", passport.authenticate("jwt", { session: false }), requireRole("ADMIN"), prodControl.update);

// Eliminar producto (ADMIN)
router.delete("/id/:id", passport.authenticate("jwt", { session: false }), requireRole("ADMIN"), prodControl.deleteByID);

export default router;
