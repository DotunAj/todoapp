const express = require('express');
const todoController = require('../todo-controller/todos');
const router = express.Router();

// Get all todos
router.get('/api/v1/todos', todoController.getAllTodos);

// Post new todo to todos
router.post('/api/v1/todos', todoController.postTodo);

// Get a single todo object
router.get('/api/v1/todos/:id', todoController.getTodo);

// Delete a todo object
router.delete('/api/v1/todos/:id', todoController.deleteTodo);

// Update todo
router.put('/api/v1/todos/:id', todoController.updateTodo)

module.exports = router;
