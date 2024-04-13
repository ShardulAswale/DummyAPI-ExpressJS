const express = require("express");
const router = express.Router();
const Products = require("../repository/products");
const products = new Products();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Product Welcome Page
 *     description: Returns a welcome message for products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             example: Welcome to products page
 */
router.get("/", (req, res) => {
  res.send("Welcome to products page");
});

/**
 * @swagger
 * /products/products:
 *   get:
 *     summary: Get list of products
 *     description: Retrieves a list of all products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products Found
 *         content:
 *           application/json:
 *             example:
 *               summary: List of products
 *               value:
 *                 message: "List of products"
 *                 products: [{"id": "1", "name": "Product 1"}, {"id": "2", "name": "Product 2"}]
 *                 productsLength: 10
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/products", async (req, res) => {
  try {
    const { Products, productsLength } = await products.getAllProducts();
    res.status(200).json({ message: "List of products", productsList: Products , productsLength: productsLength});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /products/product:
 *   post:
 *     summary: Add a new product
 *     description: Adds a new product to the system.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"product": {"name": "New Product"}}
 *     responses:
 *       200:
 *         description: Product Added
 *         content:
 *           application/json:
 *             example: {"message": "Product Added", "id": "new_product_id"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.post("/product", async (req, res) => {
  try {
    let product = req.body.product;
    const result = await products.insertProduct(product);
    res.json({ message: "Product Added", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /products/product/id:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieves a product by ID using query parameter.
 *     tags: [Products]
 *     parameters:
 *       - name: _id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product Found
 *         content:
 *           application/json:
 *             example: {"message": "Product Found", "product": {"id": "1", "name": "Product 1"}}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/product/id", async (req, res) => {
  try {
    let id = req.query._id;
    const result = await products.getProductByID1(id);

    if (result !== null) {
      res.json({ message: "Product Found", product: result });
    } else {
      res.json({ message: "Product not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /products/product/id/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieves a product by ID using path parameter.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product Found
 *         content:
 *           application/json:
 *             example: {"message": "Product Found", "product": {"id": "1", "name": "Product 1"}}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/product/id/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await products.getProductByID2(id);
    res.json({ message: "Product Found", product: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /products/product:
 *   put:
 *     summary: Update a product
 *     description: Updates a product's information.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"product": {"name": "Updated Product"}}
 *     responses:
 *       200:
 *         description: Product Updated
 *         content:
 *           application/json:
 *             example: {"message": "Product Updated"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.put("/product", async (req, res) => {
  try {
    let id = req.query.id;
    let product = req.body.product;
    const result = await products.updateProduct(id, product);
    res.json({ message: "Product Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /products/product:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product by ID.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product Deleted
 *         content:
 *           application/json:
 *             example: {"message": "Product Deleted"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.delete("/product", async (req, res) => {
  try {
    let id = req.query.id;
    const result = await products.deleteProduct(id);
    res.json({ message: "Product Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /products/products/{pageSize}/{pageNumber}:
 *   get:
 *     summary: Get products with pagination
 *     description: Retrieves a paginated list of products.
 *     tags: [Products]
 *     parameters:
 *       - name: pageSize
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: pageNumber
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Products page
 *         content:
 *           application/json:
 *             example: {"message": "Products page", "pagination": {"totalProducts": 10, "totalPages": 2, "currentPage": 1, "pageSize": 5, "nextPage": 2, "prevPage": null}, "products": [{"id": "1", "name": "Product 1"}, {"id": "2", "name": "Product 2"}]}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/products/:pageSize/:pageNumber", async (req, res) => {
  try {
    let pageSize = parseInt(req.params.pageSize);
    let pageNumber = parseInt(req.params.pageNumber);
    const result = await products.getProductsWithPagination(pageSize, pageNumber);
    const response = {
      message: `Products page ${pageNumber} of size ${pageSize}`,
      pagination: {
        totalProducts: result.totalProducts,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        pageSize: result.pageSize,
        nextPage:
          result.currentPage < result.totalPages
            ? result.currentPage + 1
            : null,
        prevPage: result.currentPage > 1 ? result.currentPage - 1 : null,
      },
      products: result.products,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
