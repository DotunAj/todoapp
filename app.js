const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index')

// Set up the express app
const app = express();

// Setting up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

// Start server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
