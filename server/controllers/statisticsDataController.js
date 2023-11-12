const Transaction = require('../models/transactionsModel');

const handleGetStistics = async (req, res) => {
    const month = req.query.month;

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
            { $match: { sold: true } },
            { $group: { _id: null, totalSoldItems: { $sum: 1 } } }
        ]);

        console.log(totalSoldItemsObj);

        let totalSoldItems = totalSoldItemsObj[0].totalSoldItems || 0;

        // Get the total number of not sold items of the selected month
        const totalNotSoldItems = await Transaction.estimatedDocumentCount({ dateOfSale: { $month: '$dateOfSale' } }) - totalSoldItems;

        // Send the response
        res.send({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        });

    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ error: 'Error retrieving transactions' });
    }
}

module.exports = {
    handleGetStistics,
}