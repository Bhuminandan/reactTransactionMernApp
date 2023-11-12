// Import necessary dependencies from Redux Toolkit and Axios
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Define an asynchronous thunk for fetching transactions
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async ({ currentPage, searchedTerm }) => {

        console.log(currentPage, searchedTerm);
        try {
            // Fetch transactions data from the API based on the provided currentPage and searchedTerm
            const res = await axios.get(`https://react-transaction-mern-app.vercel.app/find?page=${currentPage}&search=${searchedTerm}`);
            const data = res.data;
            console.log(data);
            return data;
        } catch (error) {
            // Log the error in case of an error during the API request
            console.log(error);
        }
    }
);

// Create a Redux slice for transactions
export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        isLoading: false,
        transactions: [], // Adjust this based on your actual data structure
        error: null,
    },
    reducers: {},  // No additional reducers defined
    extraReducers: (builder) => {
        // Handle different actions based on the asynchronous thunk status
        builder
            .addCase(fetchTransactions.pending, (state) => {
                // Set loading state to true when the fetch is pending
                state.isLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                // Set loading state to false and update transactions when the fetch is successful
                state.isLoading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                // Set loading state to false and update error state when the fetch is rejected
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

// Export the reducer
export default transactionsSlice.reducer;
