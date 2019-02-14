const express = require('express');
const db = require('./db/db');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Setting up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Get all todos
app.get('/api/v1/todos', (req, res) => {
    res.status(200).send({ // Status 200 is for OK
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    })
});

// Post new todo to todos
app.post('/api/v1/todos', (req, res) => {
    if(!req.body.title){
        return res.status(400).send({ // Status 400 is for bad request
            success: 'false',
            message: "title is missing in task",
        })
    }
    else if(!req.body.completed){
        return res.status(400).send({
            success: "false",
            message: "completed flag is missing"
        })
    }
    const todo = {
        id: db.length + 1,
        title: req.body.title,
        completed: req.body.completed
    }
    db.push(todo);
    return res.status(201).send({ // Status 201 means Created
        success: "true",
        message: "todo posted successfully",
        todo
    });
})

// Get a single todo object
app.get('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let todoFromDb;
    db.map(todo => {
        if(todo.id === id){
            todoFromDb = todo;
        }
    });

    if(typeof todoFromDb !== undefined){
        return res.status(200).send({
            success: "true",
            message: "todo retrieved successfully",
            todo: todoFromDb
        })
    } else {
        return res.status(404).send({ // Status 404 means Not found
            success: "false",
            message: "todo does not exist"
        });
    }
});

// Delete a todo object
app.delete('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let todoIndex;
    db.map((todo, index) => {
        if(todo.id === id){
            todoIndex = index;
        }
    });

    if(typeof todoIndex !== undefined){
        db.splice(todoIndex, 1);
        return res.status(200).send({
            success: "true",
            message: "Todo deleted successfully"
        });
    }else {
        return res.status(404).send({
            success: "false",
            message: "Todo does not exist"
        });
    }
});

app.put('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let oldTodo;
    let oldTodoIndex;
    db.map((todo, index) => {
        if(todo.id === id){
            oldTodo = todo;
            oldTodoIndex = index;
        }
    });

    if(!oldTodo){
        return res.status(404).send({
            success: "false",
            message: "Todo does not exist"
        });
    } else if(!req.body.title && !req.body.completed){
        return res.status(400).send({
            success: "false",
            message: "You have to change at least one of the data"
        });
    } else {
        const newTodo = {
            id: id,
            title: req.body.title || oldTodo.title,
            completed: req.body.completed || oldTodo.completed
        };
        db.splice(oldTodoIndex, 1, newTodo);
        return res.status(201).send({
            success: "true",
            message: "Todo updated successfully",
            todo: newTodo
        });
    }

})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
