import TicketRepository from "../repositories/ticket.repository.js";
import ProductService from "./product.service.js";

const ticketRepo = new TicketRepository();
const productServ = new ProductService();

class TicketService {
  async doSale(cart, userEmail) {
    if (!cart || !cart.products || cart.products.length === 0) {
      throw new Error("El carrito está vacío o no es válido");
    }

    for (const item of cart.products) {
      const product = await productServ.getByProductNum(item.num);
      if (!product) {
        throw new Error(`Producto no encontrado con num ${item.num}`);
      }
      if (typeof product.stock === "number" && product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para el producto ${product.title} con num ${item.num}`);
      }
    }

    for (const item of cart.products) {
      const { num, quantity } = item;
      const product = await productServ.getByProductNum(num);
      const nuevoStock = product.stock - quantity;
      await productServ.updateProduct(product._id, { stock: nuevoStock });
    }

    let totalAmount = 0;
    for (const item of cart.products) {
      totalAmount += item.price * item.quantity;
    }

    const ticketProducts = cart.products.map(p => ({
      num: p.num,
      title: p.title,
      price: p.price,
      quantity: p.quantity
    }));

    const ticketData = {
      purchaser: userEmail,
      amount: totalAmount,
      products: ticketProducts
    };

    const ticket = await ticketRepo.create(ticketData);
    if (!ticket) {
      throw new Error("No se pudo crear el ticket");
    }
    // Asignar el _id como code
    ticket.code = ticket._id;
    return ticket;
  }
}

export default TicketService;
