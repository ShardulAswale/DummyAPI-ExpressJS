const express = require("express");
const router = express.Router();
const Orders = require("../repository/orders");
const orders = new Orders();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Order Welcome Page
 *     description: Returns a welcome message for orders.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             example: Welcome to orders page
 */
router.get("/", (req, res) => {
  res.send("Welcome to orders page");
});

/**
 * @swagger
 * /orders/orders:
 *   get:
 *     summary: Get list of orders
 *     description: Retrieves a list of all orders.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Orders Found
 *         content:
 *           application/json:
 *             example:
 *               summary: List of orders
 *               value:
 *                 message: "List of orders"
 *                 orders: [{"id": "1", "product": "Product 1"}, {"id": "2", "product": "Product 2"}]
 *                 ordersLength: 10
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/orders", async (req, res) => {
  try {
    const { Orders, ordersLength } = await orders.getAllOrders();
    res.status(200).json({ message: "List of orders", ordersList: Orders , ordersLength: ordersLength});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/**
 * @swagger
 * /orders/order:
 *   post:
 *     summary: Add a new order
 *     description: Adds a new order to the system.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"order": {"product": "New Product"}}
 *     responses:
 *       200:
 *         description: Order Added
 *         content:
 *           application/json:
 *             example: {"message": "Order Added", "id": "new_order_id"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.post("/order", async (req, res) => {
  try {
    let order = req.body.order;
    const result = await orders.insertOrder(order);
    res.json({ message: "Order Added", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /orders/order/id:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieves an order by ID using query parameter.
 *     tags: [Orders]
 *     parameters:
 *       - name: _id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order Found
 *         content:
 *           application/json:
 *             example: {"message": "Order Found", "order": {"id": "1", "product": "Product 1"}}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/order/id", async (req, res) => {
  try {
    let id = req.query._id;
    const result = await orders.getOrderByID1(id);

    if (result !== null) {
      res.json({ message: "Order Found", order: result });
    } else {
      res.json({ message: "Order not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /orders/order/id/{id}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieves an order by ID using path parameter.
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order Found
 *         content:
 *           application/json:
 *             example: {"message": "Order Found", "order": {"id": "1", "product": "Product 1"}}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/order/id/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await orders.getOrderByID2(id);
    res.json({ message: "Order Found", order: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /orders/order:
 *   put:
 *     summary: Update an order
 *     description: Updates an order's information.
 *     tags: [Orders]
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
 *           example: {"order": {"product": "Updated Product"}}
 *     responses:
 *       200:
 *         description: Order Updated
 *         content:
 *           application/json:
 *             example: {"message": "Order Updated"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.put("/order", async (req, res) => {
  try {
    let id = req.query.id;
    let order = req.body.order;
    const result = await orders.updateOrder(id, order);
    res.json({ message: "Order Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /orders/order:
 *   delete:
 *     summary: Delete an order
 *     description: Deletes an order by ID.
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order Deleted
 *         content:
 *           application/json:
 *             example: {"message": "Order Deleted"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.delete("/order", async (req, res) => {
  try {
    let id = req.query.id;
    const result = await orders.deleteOrder(id);
    res.json({ message: "Order Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /orders/orders/{pageSize}/{pageNumber}:
 *   get:
 *     summary: Get orders with pagination
 *     description: Retrieves a paginated list of orders.
 *     tags: [Orders]
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
 *         description: Orders page
 *         content:
 *           application/json:
 *             example: {"message": "Orders page", "pagination": {"totalOrders": 10, "totalPages": 2, "currentPage": 1, "pageSize": 5, "nextPage": 2, "prevPage": null}, "orders": [{"id": "1", "product": "Product 1"}, {"id": "2", "product": "Product 2"}]}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/orders/:pageSize/:pageNumber", async (req, res) => {
  try {
    let pageSize = parseInt(req.params.pageSize);
    let pageNumber = parseInt(req.params.pageNumber);
    const result = await orders.getOrdersWithPagination(pageSize, pageNumber);
    const response = {
      message: `Orders page ${pageNumber} of size ${pageSize}`,
      pagination: {
        totalOrders: result.totalOrders,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        pageSize: result.pageSize,
        nextPage:
          result.currentPage < result.totalPages
            ? result.currentPage + 1
            : null,
        prevPage: result.currentPage > 1 ? result.currentPage - 1 : null,
      },
      orders: result.orders,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
