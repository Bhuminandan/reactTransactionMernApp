// Import the transactions model
const Transaction = require('../models/transactionsModel');

// Controller function to handle fetching data for chart
const practiceDataController = async (req, res) => {

    let { month } = req.body;

    if (month == 0) {
        month = 1;
    }

    const monthlySalesReport = await Transaction.aggregate([
        {
            $match: {
                sold: true
            }
        },
        {
            $group: {
                _id: { $month: "$dateOfSale" },
                totalItemsSold: { $sum: 1 },
                totalRevenue: { $sum: "$price" }
            }
        },
        {
            $sort: {
                "_id": 1
            }
        }
    ]);

    res.send({ message: 'Ok', monthlySalesReport });

}

// Export the controller function
module.exports = practiceDataController



// Sold items per each month
// let soldItemsOfMonth = await Transaction.aggregate([
//     {
//         $match: {
//             $expr: {
//                 $eq: [{ $month: '$dateOfSale' }, +month]
//             }
//         }
//     },
//     {
//         $group: { _id: null, totalSaleAmount: { $sum: '$price' } }
//     }
// ])




// Getting the number of sold items per category

// let listItemsOfCategory = await Transaction.aggregate([
//     {
//         $group: {
//             _id: "$category",
//             totalItemsSold: { $sum: { $cond: { if: { $eq: ["$sold", true] }, then: 1, else: 0 } } }
//         }
//     }
// ])


// Get total revenue of the month of categoires

// const totalRevenueOfEachCategoryOfEachMonth = await Transaction.aggregate([
//     {
//         $match: {
//             $and: [
//                 { $expr: { $eq: [{ $month: '$dateOfSale' }, +month] } },
//                 { $expr: { $eq: ['$sold', true] } }
//             ]
//         }
//     },
//     {
//         $group: {
//             _id: "$category",
//             priceArr: { $sum: "$price" }
//         }
//     }
// ])




// Bulk update the sold value

// const { idArray } = req.body;

// const UpdatedArray = await Transaction.updateMany(
//     { id: { $in: idArray } },
//     { $set: { sold: true } },
// );


// res.send({ message: 'Ok', UpdatedArray });


