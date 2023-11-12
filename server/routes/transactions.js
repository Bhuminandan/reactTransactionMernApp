// Import the express library
const express = require('express');

// Create a router instance
const router = express.Router();

// Import controller functions
const handleSearchResults = require('../controllers/tableDataController').handleSearchResults;
const handleGetStistics = require('../controllers/statisticsDataController').handleGetStistics;
const handleGetChartData = require('../controllers/chartDataController').handleGetChartData;

// Import the transactions model and controller
const Transaction = require('../models/transactionsModel');
const transactionsController = require('../controllers/transactionsController');

// Initialize the database when a specific route is accessed
router.get('/', async (req, res) => {
    await transactionsController.initializeDatabase();
    res.json({ message: 'Database initialized successfully' });
});

// API to handle search and initial render
router.get('/find', handleSearchResults);

// API for getting statistics
router.get('/statistics', handleGetStistics);

// API to get Chart Data
router.get('/barchart', handleGetChartData);

// Retrieve and send all transactions from the database
router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ error: 'Error retrieving transactions' });
    }
});

// Export the router
module.exports = router;
