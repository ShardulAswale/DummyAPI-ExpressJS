const express = require("express");
const router = express.Router();
const Customers = require("../repository/customers"); // Assuming the file name is customers.js
const customers = new Customers();

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
 *     description: Returns a welcome message for customers.
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             example: Welcome to customers page
 */
router.get("/", (req, res) => {
  res.send("Welcome to customers page");
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
 *             example:
 *               summary: List of customers
 *               value:
 *                 message: "List of customers"
 *                 customers: [{"id": "1", "name": "Customer 1"}, {"id": "2", "name": "Customer 2"}]
 *                 customersLength: 10
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/customers", async (req, res) => {
  try {
    const { customerList, customerLength } = await customers.getAllCustomer;
    res
      .status(200)
      .json({ message: "List of customers", customerLength });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /customers/customer:
 *   post:
 *     summary: Add a new customer
 *     description: Adds a new customer to the system.
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"customer": {"name": "New Customer"}}
 *     responses:
 *       200:
 *         description: Customer Added
 *         content:
 *           application/json:
 *             example: {"message": "Customer Added", "id": "new_customer_id"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.post("/customer", async (req, res) => {
  try {
    let customer = req.body.customer;
    const result = await customers.insertCustomer(customer);
    res.json({ message: "Customer Added", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /customers/customer/id:
 *   get:
 *     summary: Get customer by ID
 *     description: Retrieves a customer by ID using query parameter.
 *     tags: [Customers]
 *     parameters:
 *       - name: _id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer Found
 *         content:
 *           application/json:
 *             example: {"message": "Customer Found", "customer": {"id": "1", "name": "Customer 1"}}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/customer/id", async (req, res) => {
  try {
    let id = req.query._id;
    const result = await customers.getCustomerByID1(id);

    if (result !== null) {
      res.json({ message: "Customer Found", customer: result });
    } else {
      res.json({ message: "Customer not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /customers/customer/id/{id}:
 *   get:
 *     summary: Get customer by ID
 *     description: Retrieves a customer by ID using path parameter.
 *     tags: [Customers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer Found
 *         content:
 *           application/json:
 *             example: {"message": "Customer Found", "customer": {"id": "1", "name": "Customer 1"}}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/customer/id/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await customers.getCustomerByID2(id);
    res.json({ message: "Customer Found", customer: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"customer": {"name": "Updated Customer"}}
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
router.put("/customer", async (req, res) => {
  try {
    let id = req.query.id;
    let customer = req.body.customer;
    const result = await customers.updateCustomer(id, customer);
    res.json({ message: "Customer Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /customers/customer:
 *   delete:
 *     summary: Delete a customer
 *     description: Deletes a customer by ID.
 *     tags: [Customers]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer Deleted
 *         content:
 *           application/json:
 *             example: {"message": "Customer Deleted"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.delete("/customer", async (req, res) => {
  try {
    let id = req.query.id;
    const result = await customers.deleteCustomer(id);
    res.json({ message: "Customer Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /customers/customers/{pageSize}/{pageNumber}:
 *   get:
 *     summary: Get customers with pagination
 *     description: Retrieves a paginated list of customers.
 *     tags: [Customers]
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
 *         description: Customers page
 *         content:
 *           application/json:
 *             example: {"message": "Customers page", "pagination": {"totalCustomers": 10, "totalPages": 2, "currentPage": 1, "pageSize": 5, "nextPage": 2, "prevPage": null}, "customers": [{"id": "1", "name": "Customer 1"}, {"id": "2", "name": "Customer 2"}]}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/customers/:pageSize/:pageNumber", async (req, res) => {
  try {
    let pageSize = parseInt(req.params.pageSize);
    let pageNumber = parseInt(req.params.pageNumber);
    const result = await customers.getCustomersWithPagination(
      pageSize,
      pageNumber
    );
    const response = {
      message: `Customers page ${pageNumber} of size ${pageSize}`,
      pagination: {
        totalCustomers: result.totalCustomers,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        pageSize: result.pageSize,
        nextPage:
          result.currentPage < result.totalPages
            ? result.currentPage + 1
            : null,
        prevPage: result.currentPage > 1 ? result.currentPage - 1 : null,
      },
      customers: result.customers,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
