import { Typer, mode }  from 'mongoose';
import CartRepository from '../repositories/cart.repository.js';
import UserRepository from '../repositories/user.repository.js';
import productRepository from '../repositories/product.repository.js';
//import

const cartRepository = new CartRepository();
const userRepository = new UserRepository();
const productRepository = new ProductRepository();

class CartService {
    async createCart(uid, products = []) {
        const user = await userRepository.getUserById(req.user.id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const products = await productRepository.getProductsBy(products);
        if(!products || products.length === 0) {
            throw new Error('No se encontraron productos');
        }

        for (const product of products) {
            if (!product) {
                throw new Error(`Producto no encontrado: ${product}`);
            }
        }

        const productsData = products.map(product => ({
            type: product._id,
            num: product.num,
            price: product.price,
            quantity: product.quantity
        }));

        //Seguir con la creación del carrito...
        //hacer todos los services de los otros elementos
        //faltan los routers y controllers



        
        
        return await cartRepository.createCart();
    }
}