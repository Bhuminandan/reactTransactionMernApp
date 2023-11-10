const express = require('express');
const cors = require('cors');

// Creating express app
const app = express();


// Setting up port
const port = process.env.PORT || 8000;

// Import your router and other necessary modules
const transactionsRouter = require('./routes/transactions');

// Mount the router
app.use('/', transactionsRouter);


// Middleware to handle json parsing and url encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware for CORS
app.use(cors());


// Middleware to handle requests for non-existent routes
app.use((req, res, next) => {
    res.status(404).send('Route not found');
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
