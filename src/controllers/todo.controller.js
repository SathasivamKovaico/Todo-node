const Todo = require("../models/todo.model");

// Get all todos
const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    next(error);
  }
};

// Get single todo by ID
const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// Create new todo
const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description });
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// Update todo
const updateTodo = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// Delete todo
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    res.status(200).json({ success: true, message: "Todo deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
