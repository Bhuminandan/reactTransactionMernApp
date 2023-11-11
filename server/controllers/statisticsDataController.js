const Transaction = require('../models/transactionsModel');

const handleGetStistics = async (req, res) => {
    const month = req.params.month;

    try {
        const transactions = await Transaction.find({ sold: true, category: month });
        res.json(transactions);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ error: 'Error retrieving transactions' });
    }
}

module.exports = {
    handleGetStistics,
}