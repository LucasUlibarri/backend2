import UserService from "./user.service.js";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../utils.js";
import { sendPasswordResetEmail } from "./email.service.js";
import { createHash, validatePassword } from "../utils.js";

const userService = new UserService();

class SessionService {
  async authenticateUser(email, password) {
    const user = await userService.getByEmail(email);
    if (!user || !validatePassword(password, user.password)) {
      throw new Error("Credenciales inválidas");
    }
    return user;
  }

  async sendRecoveryEmail(email) {
    if (!email) throw new Error("Email requerido");
    const user = await userService.getByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");
    const token = jwt.sign({ id: user._id }, PRIVATE_KEY, { expiresIn: "1h" });
    const resetLink = `http://localhost:${process.env.PORT || 8080}/views/reset-password?token=${token}`;
    await sendPasswordResetEmail(email, resetLink);
  }

  async resetPassword(token, newPassword) {
    if (!token || !newPassword) throw new Error("Token y nueva contraseña requeridos");
    const payload = jwt.verify(token, PRIVATE_KEY);
    const user = await userService.getById(payload.id);
    if (!user) throw new Error("Usuario no encontrado");
    const isSamePassword = validatePassword(newPassword, user.password);
    if (isSamePassword) throw new Error("No puedes usar la misma contraseña anterior");
    const hashed = createHash(newPassword);
    await userService.updateUserByID(user._id, { password: hashed });
  }
}

export default SessionService;
