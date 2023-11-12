// Import necessary dependencies from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an asynchronous thunk for fetching statistics
const fetchStatistics = createAsyncThunk(
    'statistics/fetchStatistics',
    async ({ monthIndex }) => {
        console.log(monthIndex);
        try {
            // Fetch statistics data from the API based on the provided monthIndex
            const res = await axios.get(`https://react-transaction-mern-app.vercel.app/statistics?month=${monthIndex}`);
            const data = res.data;
            console.log(data);
            return data;
        } catch (error) {
            // Log the error and return it as the payload in case of an error
            console.log(error);
            return error;
        }
    }
);

// Define the initial state for statistics
const initialState = {
    isLoading: false,
    error: null,
    statisStics: {
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0
    },
};

// Create a Redux slice for statistics
export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {},  // No additional reducers defined
    extraReducers: (builder) => {
        // Handle different actions based on the asynchronous thunk status
        builder
            .addCase(fetchStatistics.pending, (state) => {
                // Set loading state to true when the fetch is pending
                state.isLoading = true;
            })
            .addCase(fetchStatistics.fulfilled, (state, action) => {
                // Set loading state to false and update statistics when the fetch is successful
                state.isLoading = false;
                state.statisStics = action.payload;
            })
            .addCase(fetchStatistics.rejected, (state, action) => {
                // Set loading state to false and update error state when the fetch is rejected
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

// Export the reducer and the asynchronous thunk
export default statisticsSlice.reducer;
export { fetchStatistics };
