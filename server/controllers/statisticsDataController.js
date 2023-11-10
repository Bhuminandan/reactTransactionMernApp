const Transaction = require('../models/transactionsModel');

const handleGetStistics = async (req, res) => {
    const month = req.params.month;

    // Get the total sale amount of the selected month
    const totalSaleAmount = await Transaction.aggregate([
        { $match: { dateOfSale: { $month: month } } },
        { $group: { _id: null, totalSaleAmount: { $sum: '$price' } } },
    ]);

    // Get the total number of sold items of the selected month
    const totalSoldItems = await Transaction.aggregate([
        { $match: { dateOfSale: { $month: month } } },
        { $group: { _id: null, totalSoldItems: { $sum: '$quantity' } } },
    ])[0].totalSoldItems;

    // Get the total number of not sold items of the selected month
    const totalNotSoldItems = await Transaction.estimatedDocumentCount({ dateOfSale: { $month: month } }) - totalSoldItems;

    // Send the response
    res.send({
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems,
    });
}

module.exports = {
    handleGetStistics,
}