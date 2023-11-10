const mongoose = require('mongoose');

const pass = 'y67UTeaA4jTiue4Z';
const mongo = `mongodb+srv://mbhumione9545:${pass}@transactionapp.zvp0r3t.mongodb.net/`

// Connect to MongoDB
mongoose.connect(mongo, {
    useUnifiedTopology: true,
    dbName: 'transactions',
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });




// Mongoose Schema
const transactionSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date,
});

module.exports = mongoose.model('Transaction', transactionSchema);
