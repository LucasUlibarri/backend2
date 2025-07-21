import CartDAO from '../daos/cart.dao.js';

const cartDAO = new CartDAO();

class CartRepository {
    async createCart() {
        return await cartDAO.createCart();
    }

    async getCartById(cid) {
        return await cartDAO.getCartById(cid);
    }

    async addProductToCart(cid, pid, quantity) {
        return await cartDAO.addProductToCart(cid, pid, quantity);
    }

    async updateCart(cid, data) {
        return await cartDAO.updateCart(cid, data);
    }

    async deleteProductFromCart(cid, pid) {
        return await cartDAO.deleteProductFromCart(cid, pid);
    }
}   

export default CartRepository;