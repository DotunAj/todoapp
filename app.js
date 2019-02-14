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
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    })
});

// Post new todo to todos
app.post('/api/v1/todos', (req, res) => {
    if(!req.body.title){
        return res.status(401).send({
            success: 'false',
            message: "title is missing in task",
        })
    }
    else if(!req.body.completed){
        return res.status(401).send({
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
    return res.status(200).send({
        success: "true",
        message: "todo posted successfully",
        todo
    });
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
