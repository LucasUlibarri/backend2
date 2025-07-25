import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/views/login", (req, res) => {
  res.render("login");
});

router.get("/views/register", (req, res) => {
  res.render("register");
});

router.get(
  "/views/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { firstname, lastname, age, role } = req.user;
    res.render("profile", { firstname, lastname, age, role });
  }
);

router.get("/views/forgot-password", (req, res) => {
  res.render("forgot-password");
});

router.get("/views/reset-password", (req, res) => {
  const { token } = req.query;
  res.render("reset-password", { token });
});

router.get("/views/failed", (req, res) => {
  res.render("failed");
});

export default router;