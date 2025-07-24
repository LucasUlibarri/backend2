import { Router } from "express";
import passport from "passport";
import CartController from "../controllers/carts.controller.js";

const router = Router();
const cartController = new CartController();

// Crear carrito
router.post("/", cartController.createEmptyCart);

// Crear carrito + productos
router.post("/with-products", cartController.createCartWithProducts);

// Obtener carritos
router.get("/", cartController.getCarts);

// Obtener carrito x id
router.get("/id/:id", cartController.getCartById);

// Obtener carrito del usuario
router.get("/my-cart", passport.authenticate("jwt", { session: false }), cartController.getCurrentCart);

// Agregar producto al carrito
router.put("/addToCart/:cid/:pid", cartController.addProductToCartByParams);

// Actualizar cantidad de un producto en el carrito
router.put("/id/:id/product", cartController.updateProductQuantity);

// Actualizar todo el carrito
router.put("/id/:id", cartController.updateCart);

// Eliminar producto del carrito
router.delete("/id/:id/product/num/:num", cartController.deleteProductFromCart);

// Eliminar carrito
router.delete("/id/:id", cartController.deleteCart);

// Checkout
router.post("/:id/checkout", passport.authenticate("jwt", { session: false }), cartController.doSale);

export default router;