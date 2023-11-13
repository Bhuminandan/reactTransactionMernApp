// Import the transactions model
const Transaction = require('../models/transactionsModel');

// Controller function to handle fetching data for chart
const handleGetChartData = async (req, res) => {

    // Extract the month from the query parameters
    const month = parseInt(req.query.month) || 1;

    try {

        // Get the price range distribution
        const priceRangeDistribution = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
                    }
                }
            },
            {
                $bucket: {
                    groupBy: "$price",
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
                    default: "901 - above",
                    output: {
                        numofitems: { $sum: 1 },
                        solditems: { $sum: { $cond: { if: "$sold", then: 1, else: 0 } } }
                    }
                }
            },
        ]);

        // Send the price range distribution as the response
        res.send(priceRangeDistribution);

    } catch (error) {
        // Log and handle errors
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ error: 'Error retrieving transactions' });
    }
}

// Export the controller function
module.exports = {
    handleGetChartData,
};
