const express = require('express');
const router = express.Router();
const handleSearchResults = require('../controllers/tableDataController').handleSearchResults;
const handleGetStistics = require('../controllers/statisticsDataController').handleGetStatistics

const Transaction = require('../models/transactionsModel');
const transactionsController = require('../controllers/transactionsController');

// Initialize the database when a specific route is accessed
router.get('/', async (req, res) => {
    await transactionsController.initializeDatabase();
    res.json({ message: 'Database initialized successfully' });
});


router.get('/find', handleSearchResults)


// API for getting statistics
router.get('/statistics/:month', handleGetStistics);


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

module.exports = router;