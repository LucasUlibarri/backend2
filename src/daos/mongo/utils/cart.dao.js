import cartModel from '../models/cart.model.js';

class CartDAO {
    async getCarts() {
        try {
            let result = await cartModel.find({});
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async getCartById(cid) {
        try {
            let result = await cartModel.findOne({ _id: cid }).populate('products.product');
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async saveCart(cart) {
        try {
            let result = await cartModel.create(cart);
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async updateCart(cid, obj) {
        try {
            let result = await cartModel.updateOne({ _id: cid }, { $set: obj });
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async deleteCart(cid) {
        try {
            let result = await cartModel.deleteOne({ _id: cid });
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }
}

export default CartDAO;