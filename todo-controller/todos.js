const db = require('../db/db');
//const db = require('../config/database');
const Todo = require('../models/Todo');

class TodoController {
    getAllTodos(req, res) {
        Todo.findAll()
            .then(todos => {
                res.status(200).send({ // Status 200 is for OK
                    success: true,
                    message: 'todos retrieved successfully',
                    todos: todos
                })
            })
            .catch(err => console.log('Error', err));
    }

    postTodo(req, res) {
        if(!req.body.title){
            return res.status(400).send({ // Status 400 is for bad request
                success: false,
                message: "title is missing in task",
            })
        }
        else if(!req.body.is_completed){
            return res.status(400).send({
                success: false,
                message: "completed flag is missing"
            })
        }
        const todo = {
            title: req.body.title,
            is_completed: req.body.is_completed
        }
        Todo.create(todo)
            .then(todo => {
                return res.status(201).send({ // Status 201 means Created
                    success: true,
                    message: "todo posted successfully",
                    todo
                });
            })
            .catch(err => console.log('Error', err));
    }

    getTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        Todo.findAll({
            where: {
              id: id
            }
        }).then( todo => {
            if(todo.length === 0) {
                return res.status(404).send({ // Status 404 means Not found
                    success: false,
                    message: "todo does not exist"
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: "todo retrieved successfully",
                    todo: todo
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(400).send({
                success: false,
                message: err
            })
        });
    }

    deleteTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        Todo.destroy({
            where: {
                id: id
            }
        }).then((todo) => {
            if(todo >= 1) {
                return res.status(200).send({
                    success: true,
                    message: "Todo deleted successfully"
                });
            } else {
                return res.status(404).send({
                    success: false,
                    message: "Todo does not exist"
                });
            }
        }).catch((err) => {
            console.log(err);
            return res.status(400).send({
                success: false,
                message: err
            });
        })
    }

    updateTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        let oldTodo;
        // Check if todo exist and assign it to variables
        Todo.findAll({where:{
            id
        }}).then(todo => {
            if(todo.length === 0){
                return res.status(404).send({
                    success: false,
                    message: "Todo does not exist"
                })
            }
            // Check is title or is_ completed exist
            if(!req.body.title && !req.body.is_completed){
                return res.status(400).send({
                    success: false,
                    message: "You have to change at least one of the data"
                });
            }
            oldTodo = todo;

            // Update todo
            Todo.update({
                title: req.body.title || oldTodo.title,
                is_completed: req.body.is_completed || oldTodo.is_completed
            },{
                where:{
                    id
                }
            }).then((updated) => {
                console.log(`Updated ${updated} entry on the database`)
                return res.status(201).send({
                    success: true,
                    message: "Todo updated successfully"
                });
            }).catch(err => {
                return res.status(400).send({
                    success: false,
                    message: err
                })
            });

            }).catch(err => {
                return res.status(400).send({
                    success: false,
                    message: err
                })
            })
    }
}

module.exports = new TodoController();