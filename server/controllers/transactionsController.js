const axios = require('axios');
const Transaction = require('../models/transactionsModel');

async function initializeDatabase() {
    try {
        // Fetch data from the third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;


        // Populate your Mongoose model with the retrieved data
        const transactions = await Transaction.insertMany(data);

        console.log(`${transactions.length} transactions inserted into the database.`);

    } catch (error) {
        console.error('Error initializing the database:', error);
    }
}

module.exports = {
    initializeDatabase,
};
