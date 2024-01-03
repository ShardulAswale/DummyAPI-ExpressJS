const express = require("express");
const router = express.Router();
const Users = require("../repository/users");
const users = new Users();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User endpoints
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: User Welcome Page
 *     description: Returns a welcome message.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             example: Welcome to users page
 */
router.get("/", (req, res) => {
  res.send("Welcome to users page");
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Add a new user
 *     description: Adds a new user to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"user": {"username": "john_doe", "email": "john.doe@example.com"}}
 *     responses:
 *       200:
 *         description: User Added
 *         content:
 *           application/json:
 *             example: {"message": "User Added", "id": "new_user_id"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.post("/user", async (req, res) => {
  try {
    let user = req.body.user;
    const result = await users.insertUser(user);
    res.json({ message: "User Added", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     responses:
 *       200:
 *         description: Users Found
 *         content:
 *           application/json:
 *             example: {"message": "User Found", "users": [{"id": "123456789", "username": "john_doe", "email": "john.doe@example.com"}]}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/user", async (req, res) => {
  try {
    const result = await users.getAllUser();
    res.json({ message: "User Found", users: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /user/id:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves a user by ID using query parameter.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User Found
 *         content:
 *           application/json:
 *             example: {"message": "User Found", "users": [{"id": "123456789", "username": "john_doe", "email": "john.doe@example.com"}]}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/user/id", async (req, res) => {
  try {
    let id = req.query.id;
    const result = await users.getUserByID1(id);
    res.json({ message: "User Found", users: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /user/id/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves a user by ID using path parameter.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User Found
 *         content:
 *           application/json:
 *             example: {"message": "User Found", "users": [{"id": "123456789", "username": "john_doe", "email": "john.doe@example.com"}]}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/user/id/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await users.getUserByID2(id);
    res.json({ message: "User Found", users: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update a user
 *     description: Updates a user's information.
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
 *           example: {"user": {"username": "john_doe_updated", "email": "john.doe@example.com"}}
 *     responses:
 *       200:
 *         description: User Updated
 *         content:
 *           application/json:
 *             example: {"message": "User Updated"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.put("/user", async (req, res) => {
  try {
    let id = req.query.id;
    let user = req.body.user;
    const result = await users.updateUser(id, user);
    res.json({ message: "User Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User Deleted
 *         content:
 *           application/json:
 *             example: {"message": "User Deleted"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.delete("/user", async (req, res) => {
  try {
    let id = req.query.id;
    const result = await users.deleteUser(id);
    res.json({ message: "User was deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /users/{pageSize}/{pageNumber}:
 *   get:
 *     summary: Get users with pagination
 *     description: Retrieves a paginated list of users.
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
 *         description: Users page
 *         content:
 *           application/json:
 *             example: {"message": "Users page", "pagination": {"totalUsers": 10, "totalPages": 2, "currentPage": 1, "pageSize": 5, "nextPage": 2, "prevPage": null}, "users": [{"id": "123456789", "username": "john_doe", "email": "john.doe@example.com"}]}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/users/:pageSize/:pageNumber", async (req, res) => {
  try {
    let pageSize = parseInt(req.params.pageSize);
    let pageNumber = parseInt(req.params.pageNumber);
    const result = await users.getUsersWithPagination(pageSize, pageNumber);
    const response = {
      message: `Users page ${pageNumber} of size ${pageSize}`,
      pagination: {
        totalUsers: result.totalUsers,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        pageSize: result.pageSize,
        nextPage:
          result.currentPage < result.totalPages
            ? result.currentPage + 1
            : null,
        prevPage: result.currentPage > 1 ? result.currentPage - 1 : null,
      },
      users: result.users,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
