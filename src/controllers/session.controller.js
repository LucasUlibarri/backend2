import SessionService from "../services/ticket.service.js";
import userDTO  from "../dtos/user.DTO.js";
import { generateToken } from "../utils.js";

const sessionService = new SessionService();

class SessionsController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await sessionService.authenticateUser(email, password);
      const token = generateToken(user);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 3600000,
        })
        .json({ status: "success", payload: userDTO(user) });
    } catch (error) {
      res.status(401).json({ status: "error", message: error.message });
    }
  }

  // Método para manejar el registro después de Passport
  async register(req, res) {
    // Passport ya habrá creado el usuario y lo deja en req.user
    if (!req.user) {
      return res.status(400).json({ status: "error", message: "No se pudo registrar el usuario" });
    }
    res.status(201).json({ status: "success", message: "Usuario registrado correctamente", payload: userDTO(req.user) });
  }

  async logout(req, res) {
    res.clearCookie("access_token").redirect("/views/login");
  }

  async current(req, res) {
    res.json({ status: "success", payload: userDTO(req.user) });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      await sessionService.sendRecoveryEmail(email);
      res.json({ status: "success", message: "Correo de recuperación enviado. El Token para pruebas está en consola de VS" });
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  }

  async resetPassword(req, res) {
    const { token, newPassword } = req.body;
    try {
      await sessionService.resetPassword(token, newPassword);
      res.render("login", { message: "Contraseña actualizada correctamente" });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  }
}

export default SessionsController;
