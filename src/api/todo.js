const express = require("express");
// const Todo = require("../models/Todo");
const todoController = require("../controllers/todoController");
const todoSchema = require("../validations/todoSchema");
const validator = require("../middlewares/validator");
const jwtAuth = require("../middlewares/jwtAuth");
const router = express.Router();
// Tạo api todo
router.post(
  "/",
  validator(todoSchema.createTodoSchema),
  todoController.createTodo
);

// Lấy danh sách todo
router.get("/", todoController.getTodos);

router.delete(
  "/:id",
  validator(todoSchema.idSchema, "params"),

  todoController.deleteTodoById
); // params vì lấy id từ params

router.patch(
  "/:id",
  validator(todoSchema.idSchema, "params"),
  validator(todoSchema.updateTodoSchema),
  todoController.updateTodo
);

module.exports = router;
