// Import the mongoose library
const mongoose = require('mongoose');

// MongoDB connection details
const password = 'y67UTeaA4jTiue4Z';
const mongoURI = `mongodb+srv://mbhumione9545:${password}@transactionapp.zvp0r3t.mongodb.net/`;

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useUnifiedTopology: true,
    dbName: 'transactions',
})
    .then(() => {
        // Log success message when connected
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        // Log error if connection fails
        console.error('Error connecting to MongoDB:', err);
    });

// Mongoose Schema definition
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

// Export the mongoose model based on the defined schema
module.exports = mongoose.model('Transaction', transactionSchema);
