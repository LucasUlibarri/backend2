import { Router } from "express";
import passport from "passport";
import SessionsController from "../controllers/session.controller.js";
import userDTO from "../dtos/user.DTO.js";

const sessionController = new SessionsController();
const router = Router();

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.post("/login", (req, res) => sessionController.login(req, res));
router.post("/logout", (req, res) => sessionController.logout(req, res));
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ status: "success", payload: userDTO(req.user) });
});
router.post("/forgot-password", (req, res) => sessionController.forgotPassword(req, res));
router.post("/reset-password", (req, res) => sessionController.resetPassword(req, res));

router.post("/register", passport.authenticate("register", { session: false }), (req, res) => sessionController.register(req, res));

export default router;