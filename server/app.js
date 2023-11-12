// Import necessary modules
const express = require('express');
const cors = require('cors');

// Create express app
const app = express();

// Set up port
const port = process.env.PORT || 8000;

// Middleware to handle JSON parsing and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for CORS
app.use(cors({
    origin: ["https://react-transaction-mern-app-gbff.vercel.app"],
    methods: ["POST", "GET"],
}));

// Import your router and other necessary modules
const transactionsRouter = require('./routes/transactions');

// Mount the router
app.use('/', transactionsRouter);

// Middleware to handle requests for non-existent routes
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
