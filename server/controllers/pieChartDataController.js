// Import the transactions model
const Transaction = require('../models/transactionsModel');

// Controller function to handle fetching data for chart
const pieChartDataController = async (req, res) => {

    // Extract the month from the query parameters
    const month = parseInt(req.query.month) || 1;

    console.log(month);

    try {

        // Get the price range distribution
        const categoriesDistribution = await Transaction.aggregate([
            {
                $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
            ,
        ]);

        // Send the price range distribution as the response

        res.send(categoriesDistribution);

    } catch (error) {
        // Log and handle errors
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ error: 'Error retrieving transactions' });
    }
}

// Export the controller function
module.exports = {
    pieChartDataController,
};
