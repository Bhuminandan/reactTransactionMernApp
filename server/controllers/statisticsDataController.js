// Import the transactions model
const Transaction = require('../models/transactionsModel');

// Controller function to handle fetching statistics
const handleGetStistics = async (req, res) => {
    // Extract the month from the query parameters
    let month = req.query.month;

    if (month == 0) {
        month = 1
    }

    console.log(month);

    try {
        // Get the total sale amount of the selected month
        const totalAmountObj = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
                    }
                }
            },
            { $group: { _id: null, totalSaleAmount: { $sum: '$price' } } },
        ]);

        // Extract the total sale amount or default to 0 if not available
        let totalSaleAmount = totalAmountObj[0].totalSaleAmount || 0;

        // Get the total number of sold items of the selected month
        const totalSoldItemsObj = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
                            { $eq: ["$sold", true] }
                        ]
                    }
                }
            },
            { $group: { _id: null, totalSoldItems: { $sum: 1 } } }
        ]);

        // Log the total sold items for debugging
        console.log(totalSoldItemsObj);

        // Extract the total number of sold items or default to 0 if not available
        let totalSoldItems = totalSoldItemsObj[0].totalSoldItems || 0;

        // Get the total number of not sold items of the selected month
        const totalNotSoldItemsObj = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
                            { $eq: ["$sold", false] }
                        ]
                    }
                }
            },
            { $group: { _id: null, totalNotSoldItems: { $sum: 1 } } }
        ]);

        // Extract the total number of not sold items or default to 0 if not available
        const totalNotSoldItems = totalNotSoldItemsObj.length > 0 ? totalNotSoldItemsObj[0].totalNotSoldItems : 0;

        // Send the response with the calculated statistics
        res.send({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        });

    } catch (error) {
        // Log and handle errors
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ error: 'Error retrieving transactions' });
    }
}

// Export the controller function
module.exports = {
    handleGetStistics,
}
