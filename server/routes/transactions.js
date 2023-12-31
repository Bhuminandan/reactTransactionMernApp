// Import the express library
const express = require('express');

// Create a router instance
const router = express.Router();

// Import controller functions
const handleSearchResults = require('../controllers/tableDataController').handleSearchResults;
const handleGetStistics = require('../controllers/statisticsDataController').handleGetStistics;
const handleGetChartData = require('../controllers/chartDataController').handleGetChartData;
const practiceDataController = require('../controllers/practiceDataController');

// Import the transactions model and controller
const transactionsController = require('../controllers/transactionsController');
const { pieChartDataController } = require('../controllers/pieChartDataController');

// Initialize the database when a specific route is accessed
router.get('/', async (req, res) => {
    await transactionsController.initializeDatabase();
    res.json({ message: 'Database initialized successfully' });
});

// API to handle search and initial render
router.post('/find', handleSearchResults);

// API for getting statistics
router.get('/statistics', handleGetStistics);

// API to get Chart Data
router.get('/barchart', handleGetChartData);

// API to handle pie chart data
router.get('/piechart', pieChartDataController);

// API for practicing queries
router.post('/practicing', practiceDataController);

// Export the router
module.exports = router;
