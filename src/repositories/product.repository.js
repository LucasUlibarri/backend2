import ProductDAO from '../daos/mongo/utils/product.dao.js';

const productDAO = new ProductDAO();

class ProductRepository {
    async getAllProducts() {
        return await productDAO.getAllProducts();
    }

    async getProductById(pid) {
        return await productDAO.getProductById(pid);
    }

    async createProduct(data) {
        return await productDAO.createProduct(data);
    }

    async updateProduct(pid, data) {
        return await productDAO.updateProduct(pid, data);
    }

    async deleteProduct(pid) {
        return await productDAO.deleteProduct(pid);
    }
}

export default ProductRepository;