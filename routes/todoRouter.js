const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User endpoints
 */

router.get("/",(res,req)=>{
    req.send("Welcome to todos page")
})
router.get("/todos", (res,req)=>{
    res.status(200).json({message:"list of todos"})
})
module.exports = router