const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Operations related to customers
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Customer Welcome Page
 *     description: Returns a welcome message.
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             example: Welcome to Customers page
 */
router.get("/", (req, res) => {
  res.send("Welcome to Customers page");
});

/**
 * @swagger
 * /customers/customers:
 *   get:
 *     summary: Get list of customers
 *     description: Retrieves a list of all customers.
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Customers Found
 *         content:
 *           application/json:
 *             example: {"message": "List of customers", "customers": [{"id": "1", "name": "Customer 1"}, {"id": "2", "name": "Customer 2"}]}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/customers", (req, res) => {
  res.status(200).json({ message: "List of customers" });
});

/**
 * @swagger
 * /customers/customer:
 *   put:
 *     summary: Update a customer
 *     description: Updates a customer's information.
 *     tags: [Customers]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer Updated
 *         content:
 *           application/json:
 *             example: {"message": "Customer Updated"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.put("/customer", (req, res) => {
  res.status(200).send("Successfully updated customer");
});

module.exports = router;
