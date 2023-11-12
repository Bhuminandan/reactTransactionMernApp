const Transaction = require('../models/transactionsModel');

async function handleSearchResults(req, res) {
    try {
        const { page, search } = req.query;

        // Define the number of items per page
        const itemsPerPage = 10;

        // Convert page number to skip value
        const skip = (page - 1) * itemsPerPage;

        // Create a regular expression for case-insensitive search
        const regex = new RegExp(search, 'i');

        // Use $or to match any of the specified conditions
        let query;
        if (search) {
            query = {
                $or: [
                    { title: { $regex: regex } },
                    { description: { $regex: regex } },
                    { productPrice: { $eq: Number(search) } },
                ]
            };
        } else {
            query = {};
        }

        // Apply skip and limit separately
        let filteredData;
        if (search) {
            // If search term is provided, apply the search query
            filteredData = await Transaction.find(query)
                .skip(skip)
                .limit(itemsPerPage)
                .exec();
        } else {
            // If no search term is provided, return the first 10 results from the entire database
            filteredData = await Transaction.find({})
                .skip(skip)
                .limit(itemsPerPage)
                .exec();
        }

        // Get the total count of items found with the search query
        const totalItemsFound = await Transaction.countDocuments(query);

        res.json({ totalItemsFound, filteredData });
    } catch (error) {
        console.log('Error in searching API', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleSearchResults,
};
