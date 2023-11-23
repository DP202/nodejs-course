// controller là nơi xử lý logic

const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");

const createTodo = async (req, res) => {
  const { content } = req.body;
  const newTodo = new Todo({
    content,
  });
  await newTodo.save();
  res.status(201).json({
    success: true,
    user: req.user,
  });
};

const getTodos = async (req, res) => {
  const todos = await Todo.find(); // find(): trả v62 tất cả collection
  res.json({
    success: true,
    data: todos,
  });
};

const deleteTodoById = async (req, res) => {
  const { id } = req.params;
  // Check id is ObjectId
  // const isObjectId = mongoose.Types.ObjectId.isValid(id);
  await Todo.findByIdAndDelete(id);
  res.json({
    success: true,
  });
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const result = await Todo.findByIdAndUpdate(id, { content });
  // findByIdAndUpdate nếu không tìm thấy thì nó return null
  res.json({
    success: true,
    result,
  });
};

module.exports = {
  createTodo,
  getTodos,
  deleteTodoById,
  updateTodo,
};
