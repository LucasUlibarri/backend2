import { Types } from 'mongoose';
import CartRepository from '../repositories/cart.repository.js';
import UserRepository from '../repositories/user.repository.js';
import ProductRepository from '../repositories/product.repository.js';

const cartRepository = new CartRepository();
const userRepository = new UserRepository();
const productRepository = new ProductRepository();

class CartService {
    async createCart(uid, productNums = []) {
        const user = await userRepository.getById(uid);
        if (!user) throw new Error('Usuario no encontrado');

        const products = await productRepository.getByNumbersArray(productNums);
        if (!products || products.length === 0) throw new Error('Productos no encontrados');

        for (const prod of products) {
            if (typeof prod.stock === 'number') {
                if (prod.stock < 1) throw new Error(`Sin stock: ${prod.title}`);
            }
        }

        const cartProducts = products.map(prod => ({
            num: prod.num,
            title: prod.title,
            price: prod.price,
            quantity: 1
        }));

        const total = cartProducts.reduce((acc, p) => acc + p.price * p.quantity, 0);

        let number = 1;
        const allCarts = await cartRepository.getAll();
        if (allCarts && allCarts.length > 0) {
            const nums = allCarts.map(c => c.num || 0);
            number = Math.max(...nums) + 1;
        }

        const newCart = await cartRepository.create({ products: cartProducts, total, num: number });
        await userRepository.updateById(uid, { cart: newCart._id });

        return newCart;
    }

    async createEmptyCart(uid) {
        const user = await userRepository.getById(uid);
        if (!user) throw new Error('Usuario no encontrado');

        let number = 1;
        const allCarts = await cartRepository.getAll();
        if (allCarts && allCarts.length > 0) {
            const nums = allCarts.map(c => c.num || 0);
            number = Math.max(...nums) + 1;
        }

        const cart = await cartRepository.create({ user: uid, products: [], total: 0, num: number });
        await userRepository.updateById(uid, { cart: cart._id });
        return cart;
    }

    async getAllCarts() {
        return await cartRepository.getAll();
    }

    async getCartById(id) {
        return await cartRepository.getById(id);
    }

    async updateCart(id, data) {
        if (!id || typeof data !== 'object') throw new Error('Datos inválidos');
        const updated = await cartRepository.updateById(id, data);
        if (!updated || updated.modifiedCount === 0) throw new Error('No se pudo actualizar');
        return updated;
    }

    async deleteCart(id) {
        const result = await cartRepository.deleteById(id);
        if (!result || !result.deletedCount) throw new Error('No se pudo eliminar el carrito');
        return { status: 'success', message: 'Carrito eliminado' };
    }

    async addProductToCart(cartID, { num, title, price, quantity = 1 }) {
        const cart = await cartRepository.getById(cartID);
        if (!cart) throw new Error('Carrito no encontrado');

        const existing = cart.products.find(p => p.num === num);
        const newQty = existing ? existing.quantity + quantity : quantity;

        if (typeof price === 'number' && newQty < 1) throw new Error(`Sin stock: ${title}`);

        if (existing) {
            existing.quantity = newQty;
        } else {
            cart.products.push({ num, title, price, quantity });
        }

        cart.total = cart.products.reduce((acc, p) => acc + p.price * p.quantity, 0);
        return await cartRepository.updateById(cartID, cart);
    }

    async addProductById(cartId, productId) {
        const cartID = new Types.ObjectId(String(cartId));
        const productID = new Types.ObjectId(String(productId));

        const cart = await cartRepository.getById(cartID);
        if (!cart) throw new Error('Carrito no encontrado');

        const product = await productRepository.getById(productID);
        if (!product) throw new Error('Producto no encontrado');

        const existing = cart.products.find(p => p.num === product.num);
        const newQty = existing ? existing.quantity + 1 : 1;

        if (typeof product.price === 'number' && newQty < 1) throw new Error(`Sin stock: ${product.title}`);

        if (existing) {
            existing.quantity = newQty;
        } else {
            cart.products.push({
                num: product.num,
                title: product.title,
                price: product.price,
                quantity: 1
            });
        }

        cart.total = cart.products.reduce((acc, p) => acc + p.price * p.quantity, 0);
        return await cartRepository.updateById(cartID, cart);
    }

    async updateProductQuantity(cartID, productNum, newQty) {
        const cart = await cartRepository.getById(cartID);
        if (!cart) throw new Error('Carrito no encontrado');

        const item = cart.products.find(p => p.num === productNum);
        if (!item) throw new Error('Producto no está en el carrito');

        if (newQty <= 0) {
            cart.products = cart.products.filter(p => p.num !== productNum);
        } else {
            item.quantity = newQty;
        }

        cart.total = cart.products.reduce((acc, p) => acc + p.price * p.quantity, 0);
        return await cartRepository.updateById(cartID, cart);
    }

    async removeProductFromCart(cartID, productNum) {
        const cart = await cartRepository.getById(cartID);
        if (!cart) throw new Error('Carrito no encontrado');

        const before = cart.products.length;
        cart.products = cart.products.filter(p => p.num !== productNum);

        if (before === cart.products.length) throw new Error('Producto no encontrado');

        cart.total = cart.products.reduce((acc, p) => acc + p.price * p.quantity, 0);
        return await cartRepository.updateById(cartID, cart);
    }
}

export default CartService;