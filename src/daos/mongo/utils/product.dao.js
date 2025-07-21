import productModel from '../models/product.model.js';

class ProductDAO {
    async getProducts() {
        try {
            let result = await productModel.find({});
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async getProductById(cid) {
        try {
            let result = await productModel.findOne({ _id: cid }).populate('products.product');
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async saveProduct(product) {
        try {
            let result = await productModel.create(product);
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async updateProduct(pid, obj) {
        try {
            let result = await productModel.updateOne({ _id: pid }, { $set: obj });
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async deleteProduct(pid) {
        try {
            let result = await productModel.deleteOne({ _id: pid });
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }
}

export default ProductDAO;