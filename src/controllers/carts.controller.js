import CartService from "../services/cart.service.js";
import TicketService from "../services/ticket.service.js";

const cartServ = new CartService();
const ticketServ = new TicketService();

class CartController {
  async createEmptyCart(req, res) {
    const { userID } = req.body;
    if (!userID) {
      return res.status(400).json({ status: "error", message: "Falta el ID de usuario" });
    }
    try {
      const result = await cartServ.createEmptyCart(userID, []);
      return res.status(201).json({ status: "success", payload: result });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  async createCartWithProducts(req, res) {
    const { userID, products } = req.body;
    if (!userID || !Array.isArray(products) || !products.length) {
          return res.status(400).json({ status: "error", message: "Faltan campos" });
    }
    try {
      const result = await cartServ.createCart(userID, products);
      return res.status(201).json({ status: "success", payload: result });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  async getCarts(req, res) {
    try {
      const carts = await cartServ.getAllCarts();
      res.json({ status: "success", carts });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async getCartById(req, res) {
    try {
      const cart = await cartServ.getCartById(req.params.id);
      if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
      }
      res.json({ status: "success", cart });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async getCurrentCart(req, res) {
    try {
      const user = req.user;
      if (!user.cart) {
            return res.status(404).json({ result: "error", message: "El usuario no tiene carrito asociado" });
      }
      const cart = await cartServ.getCartById(user.cart);
      if (!cart) {
            return res.status(404).json({ result: "error", message: "Carrito no encontrado" });
      }
      res.json({ result: "ok", payload: cart });
    } catch (error) {
      res.status(500).json({ result: "error", message: error.message });
    }
  }

  async updateCart(req, res) {
    const cartID = req.params.id;
    const updateData = req.body;
    try {
      const updated = await cartServ.updateCart(cartID, updateData);
          res.json({ status: "success", message: "Carrito actualizado", result: updated });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async addProductToCartByParams(req, res) {
    const { cid, pid } = req.params;
    try {
      const result = await cartServ.addProductById(cid, pid);
          res.json({ result: "ok", payload: result });
    } catch (error) {
      res.status(400).json({ result: "error", message: error.message });
    }
  }

  async updateProductQuantity(req, res) {
    const cartID = req.params.id;
    const { productNum, quantity } = req.body;
    if (!productNum || quantity === undefined) {
          return res.status(400).json({ status: "error", message: "Falta el número de producto o la cantidad" });
    }
    try {
      const result = await cartServ.updateProductQuantity(cartID, productNum, quantity);
      res.json({ status: "success", message: "Product quantity updated", result });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async deleteProductFromCart(req, res) {
    const { id: cartId, num } = req.params;
    try {
      const parsedNum = parseInt(num);
      if (isNaN(parsedNum)) {
            return res.status(400).json({ result: "error", message: "Número de producto inválido" });
      }
      const updatedCart = await cartServ.removeProductFromCart(cartId, parsedNum);
          res.json({ result: "ok", payload: updatedCart });
    } catch (error) {
      res.status(500).json({ result: "error", message: error.message });
    }
  }

  async deleteCart(req, res) {
    try {
      const result = await cartServ.deleteCart(req.params.id);
          res.json(result);
    } catch (error) {
      res.status(404).json({ status: "error", message: error.message });
    }
  }

  async doSale(req, res) {
    const cartID = req.params.id;
    const userEmail = req.user?.email || req.body?.email;
    if (!cartID || !userEmail) {
          return res.status(400).json({ status: "error", message: "Faltan datos: ID de carrito o email" });
    }
    try {
      const cart = await cartServ.getCartById(cartID);
      if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
      }
      const ticket = await ticketServ.doSale(cart, userEmail);
      await cartServ.updateCart(cartID, { products: [], total: 0 });
      res.status(201).json({ status: "success", ticket });
    } catch (error) {
          res.status(500).json({ status: "error", message: error.message || "Error inesperado al realizar la venta" });
    }
  }
}

export default CartController;
