const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');

// Setting up db connection
const db = require('./config/database');

// Testing db
db
    .authenticate()
    .then(() => console.log('Database connection has been established successfully...'))
    .catch((err) => console.log('Error', err) );

// Set up the express app
const app = express();

// Setting up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

// Start server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
