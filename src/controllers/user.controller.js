import UserService from "../services/user.service.js";

const userService = new UserService();

class UserController {
  async saveUser(req, res) {
    const { firstname, lastname, email, password, age, role } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ status: "error", mensaje: "Faltan campos obligatorios" });
    }
    try {
      const createdUser = await userService.createUser({ firstname, lastname, email, password, age, role });
      res.status(201).json({ status: "creado", payload: createdUser });
    } catch (error) {
      res.status(500).json({ status: "error", mensaje: error.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await userService.getAll();
      res.json({ status: "exito", users });
    } catch (error) {
      res.status(500).json({ status: "error", mensaje: error.message });
    }
  }

  async getUserById(req, res) {
    const id = req.params.id;
    try {
      const user = await userService.getById(id);
      if (!user) {
        return res.status(404).json({ status: "error", mensaje: "Usuario no encontrado" });
      }
      res.json({ status: "exito", user });
    } catch (error) {
      res.status(500).json({ status: "error", mensaje: error.message });
    }
  }

  async updateUserByID(req, res) {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const result = await userService.updateUserByID(id, updateData);
      res.json(result);
    } catch (error) {
      res.status(400).json({ status: "error", mensaje: error.message });
    }
  }

  async deleteUserByID(req, res) {
    const id = req.params.id;
    try {
      const result = await userService.deleteUserByID(id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ status: "error", mensaje: error.message });
    }
  }
}

export default UserController;
