const express = require("express");
const router = express.Router();
const Todos = require("../repository/todos");
const todos = new Todos();

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Operations related to todos
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Todo Welcome Page
 *     description: Returns a welcome message.
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             example: Welcome to todos page
 */
router.get("/", (req, res) => {
  res.send("Welcome to todos page");
});

/**
 * @swagger
 * /todos/todos:
 *   get:
 *     summary: Get list of todos
 *     description: Retrieves a list of all todos.
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Todos Found
 *         content:
 *           application/json:
 *             example: {"message": "List of todos", "todos": [{"id": "1", "title": "Todo 1"}, {"id": "2", "title": "Todo 2"}]}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/todos", async (req, res) => {
  try {
    const todoList = await todos.getAllTodo();
    res.status(200).json({ message: "List of todos", todos: todoList });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /todos/todo:
 *   post:
 *     summary: Add a new todo
 *     description: Adds a new todo to the system.
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"todo": {"title": "New Todo"}}
 *     responses:
 *       200:
 *         description: Todo Added
 *         content:
 *           application/json:
 *             example: {"message": "Todo Added", "id": "new_todo_id"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.post("/todo", async (req, res) => {
  try {
    let todo = req.body.todo;
    const result = await todos.insertTodo(todo);
    res.json({ message: "Todo Added", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /todos/todo/id:
 *   get:
 *     summary: Get todo by ID
 *     description: Retrieves a todo by ID using query parameter.
 *     tags: [Todos]
 *     parameters:
 *       - name: _id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo Found
 *         content:
 *           application/json:
 *             example: {"message": "Todo Found", "todo": {"id": "1", "title": "Todo 1"}}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */

router.get("/todo/id", async (req, res) => {
  try {
    let id = req.query._id;
    const result = await todos.getTodoByID1(id);

    if (result !== null) {
      res.json({ message: "Todo Found", todo: result });
    } else {
      res.json({ message: "Todo not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /todos/todo/id/{id}:
 *   get:
 *     summary: Get todo by ID
 *     description: Retrieves a todo by ID using path parameter.
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo Found
 *         content:
 *           application/json:
 *             example: {"message": "Todo Found", "todo": {"id": "1", "title": "Todo 1"}}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/todo/id/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await todos.getTodoByID2(id);
    res.json({ message: "Todo Found", todo: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /todos/todo:
 *   put:
 *     summary: Update a todo
 *     description: Updates a todo's information.
 *     tags: [Todos]
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
 *           example: {"todo": {"title": "Updated Todo"}}
 *     responses:
 *       200:
 *         description: Todo Updated
 *         content:
 *           application/json:
 *             example: {"message": "Todo Updated"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.put("/todo", async (req, res) => {
  try {
    let id = req.query.id;
    let todo = req.body.todo;
    const result = await todos.updateTodo(id, todo);
    res.json({ message: "Todo Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /todos/todo:
 *   delete:
 *     summary: Delete a todo
 *     description: Deletes a todo by ID.
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo Deleted
 *         content:
 *           application/json:
 *             example: {"message": "Todo Deleted"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.delete("/todo", async (req, res) => {
  try {
    let id = req.query.id;
    const result = await todos.deleteTodo(id);
    res.json({ message: "Todo was deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /todos/todos/{pageSize}/{pageNumber}:
 *   get:
 *     summary: Get todos with pagination
 *     description: Retrieves a paginated list of todos.
 *     tags: [Todos]
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
 *         description: Todos page
 *         content:
 *           application/json:
 *             example: {"message": "Todos page", "pagination": {"totalTodos": 10, "totalPages": 2, "currentPage": 1, "pageSize": 5, "nextPage": 2, "prevPage": null}, "todos": [{"id": "1", "title": "Todo 1"}, {"id": "2", "title": "Todo 2"}]}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"error": "Internal Server Error"}
 */
router.get("/todos/:pageSize/:pageNumber", async (req, res) => {
  try {
    let pageSize = parseInt(req.params.pageSize);
    let pageNumber = parseInt(req.params.pageNumber);
    const result = await todos.getTodosWithPagination(pageSize, pageNumber);
    const response = {
      message: `Todos page ${pageNumber} of size ${pageSize}`,
      pagination: {
        totalTodos: result.totalTodos,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        pageSize: result.pageSize,
        nextPage:
          result.currentPage < result.totalPages
            ? result.currentPage + 1
            : null,
        prevPage: result.currentPage > 1 ? result.currentPage - 1 : null,
      },
      todos: result.todos,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
