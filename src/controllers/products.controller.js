const productService = require('../services/product.service');
const userService = require('../services/user.service');

class ProductsController {
  async getAllProducts(req, res, next) {
    try {
      const {
        limit = 30,
        page = 1,
        category,
        subcategory,
        from,
        to
      } = req.query;

      const { products, collectionCount, totalPages } =
        await productService.getAllProducts({
          limit,
          page,
          category,
          subcategory,
          from,
          to
        });

      return res.status(200).json({
        status: 200,
        message: 'Товары успешно получены!',
        products,
        metadata: {
          page,
          limit,
          totalPages,
          collectionCount
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async searchProducts(req, res, next) {
    try {
      const {
        limit = 30,
        page = 1,
        query,
        category,
        subcategory,
        from,
        to
      } = req.query;

      const { searchedProducts, collectionCount, totalPages } =
        await productService.searchProducts({
          limit,
          page,
          query,
          category,
          subcategory,
          from,
          to
        });

      return res.status(200).json({
        status: 200,
        message: 'Товары успешно получены!',
        products: searchedProducts,
        metadata: {
          page,
          limit,
          totalPages,
          collectionCount
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await productService.getProductById(id);

      return res
        .status(200)
        .json({ status: 200, message: 'Товар успешно получен!', product });
    } catch (e) {
      next(e);
    }
  }

  async createNewProduct(req, res, next) {
    try {
      await userService.isAdmin(req.user.id);

      const newProduct = await productService.createNewProduct(req.body);

      return res
        .status(200)
        .json({ status: 200, message: 'Товар успешно добавлен!', newProduct });
    } catch (e) {
      next(e);
    }
  }

  async updateProductById(req, res, next) {
    try {
      const { id } = req.params;

      await userService.isAdmin(req.user.id);

      const updatedProduct = await productService.updateProductById(
        id,
        req.body
      );

      return res.status(200).json({
        status: 200,
        message: 'Товар успешно изменён!',
        updatedProduct
      });
    } catch (e) {
      next(e);
    }
  }

  async deleteProductById(req, res, next) {
    try {
      const { id } = req.params;

      await userService.isAdmin(req.user.id);

      const deletedProduct = await productService.deleteProductById(id);

      return res.status(200).json({
        status: 200,
        message: 'Товар успешно удалён!',
        deletedProduct
      });
    } catch (e) {
      next(e);
    }
  }
}

const productsController = new ProductsController();

module.exports = productsController;
