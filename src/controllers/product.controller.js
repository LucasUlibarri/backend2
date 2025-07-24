import ProductService from "../services/product.service.js";

const productService = new ProductService();

class ProductController {
  async create(req, res) {
    const data = req.body;
    try {
      const nuevoProducto = await productService.createProduct(data);
      res.status(201).json({ status: "creado", payload: nuevoProducto });
    } catch (error) {
      res.status(400).json({ status: "error", mensaje: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const productos = await productService.getAllProducts();
      res.json({ status: "exito", productos });
    } catch (error) {
      res.status(500).json({ status: "error", mensaje: error.message });
    }
  }

  async getById(req, res) {
    const pid = req.params.id;
    try {
      const producto = await productService.getProductById(pid);
      res.json({ status: "exito", producto });
    } catch (error) {
      res.status(404).json({ status: "error", mensaje: error.message });
    }
  }

  async getAll4ViewByRole(req, res) {
    try {
      const productos = await productService.getAllProducts();
      const plainProducts = productos.map(p => p.toObject ? p.toObject() : p);
      const role = req.params.role?.toUpperCase();
      if (role === "ADMIN") {
        return res.render("products-admin", { productos: plainProducts });
      } else if (role === "USER") {
        return res.render("products-user", { productos: plainProducts });
      } else {
        return res.status(403).render("403-forbidden", {
          mensaje: "Rol no autorizado o desconocido",
          user: req.user
        });
      }
    } catch (error) {
      res.status(500).send("Error al obtener productos");
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const data = req.body;
    try {
      const resultado = await productService.updateProduct(id, data);
      res.json(resultado);
    } catch (error) {
      res.status(400).json({ status: "error", mensaje: error.message });
    }
  }

  async deleteByID(req, res) {
    const id = req.params.id;
    try {
      const resultado = await productService.deleteProductByID(id);
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ status: "error", mensaje: error.message });
    }
  }
}

export default ProductController;
