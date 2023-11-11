const Transaction = require('../models/transactionsModel');

async function handleSearchResults(req, res) {
    try {
        const { page, search } = req.query;
        const itemsPerPage = 10; // Adjust this based on your desired number of items per page

        // Convert page number to skip value
        const skip = (page - 1) * itemsPerPage;

        // Create a regular expression for case-insensitive search
        const regex = new RegExp(search, 'i');

        // Use $or to match any of the specified conditions
        let query = {
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { productPrice: { $eq: Number(search) } },
            ]
        };

        // Apply skip and limit separately
        let filteredData = Transaction.find(query);

        filteredData = filteredData.skip(skip);
        filteredData = filteredData.limit(itemsPerPage);

        // Execute the query
        filteredData = await filteredData.exec();

        res.json(filteredData);
    } catch (error) {
        console.log('Error in searching API', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleSearchResults,
};
