const Transaction = require('../models/transactionsModel');


const handleGetChartData = async (req, res) => {
    const month = parseInt(req.query.month);

    console.log(month);

    try {
        // Get the total sale amount of the selected month
        const totalAmountObj = await Transaction.aggregate([
            {
                $match: {
                    dateOfSale: {
                        $gte: new Date(new Date().getFullYear(), month - 1, 1),
                        $lt: new Date(new Date().getFullYear(), month, 1),
                    }
                }
            },
            { $group: { _id: null, totalSaleAmount: { $sum: '$price' } } },
        ]);

        let totalSaleAmount = totalAmountObj[0]?.totalSaleAmount || 0;

        // Get the price range distribution
        const priceRangeDistribution = await Transaction.aggregate([
            {
                $match: {
                    dateOfSale: {
                        $gte: new Date(new Date().getFullYear(), month - 1, 1),
                        $lt: new Date(new Date().getFullYear(), month, 1),
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

        // Send the response
        res.send(priceRangeDistribution);

    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ error: 'Error retrieving transactions' });
    }
}

module.exports = {
    handleGetChartData,
};
