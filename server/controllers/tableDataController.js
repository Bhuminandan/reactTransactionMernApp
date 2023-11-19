const Transaction = require('../models/transactionsModel');

async function handleSearchResults(req, res) {
    try {
        const { page, search, currentCatergory, currentMonth, soldFilter } = req.body;


        // Define the number of items per page
        const itemsPerPage = 10;

        // Convert page number to skip value
        const skip = (page - 1) * itemsPerPage;


        // Aggregation pipeline
        const pipeline = [];

        // if month is there
        if (currentMonth !== 0) {
            pipeline.push({
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, +currentMonth]
                    }
                }
            });
        }

        // If sold filter is not 'all'
        if (soldFilter !== 'all') {
            if (soldFilter === "Sold") {
                pipeline.push({
                    $match: {
                        sold: true
                    }
                })
            } else {
                pipeline.push({
                    $match: {
                        sold: false
                    }
                })
            }
        }

        // if category is there
        if (currentCatergory !== 'all') {
            pipeline.push({
                $match: {
                    category: currentCatergory
                }
            });
        }

        // Use $or to match any of the specified conditions
        if (search) {
            const regex = new RegExp(search, 'i');
            pipeline.push({
                $match: {
                    $or: [
                        { title: { $regex: regex } },
                        { description: { $regex: regex } },
                        { productPrice: { $eq: Number(search) } },
                    ]
                }
            });
        }

        let newPipeline = [...pipeline]

        newPipeline.push({
            $count: 'totalItemsFound'
        })

        let totalItemsFound = await Transaction.aggregate(newPipeline);

        totalItemsFound = totalItemsFound[0]?.totalItemsFound || 0;


        // Apply skip and limit separately
        // If search term is provided, apply the search query
        let filteredData = await Transaction.aggregate(pipeline)
            .skip(skip)
            .limit(itemsPerPage)
            .exec();


        res.json({ totalItemsFound, filteredData });
    } catch (error) {
        console.log('Error in searching API', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleSearchResults,
};
