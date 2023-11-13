// Import necessary dependencies from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define an asynchronous thunk for fetching bar chart data
const fetchPieChartData = createAsyncThunk(
    'chartData/fetchPieChartData',
    async ({ monthIndex }) => {
        try {
            // Fetch bar chart data from the API based on the provided monthIndex
            const res = await axios.get(`https://react-transaction-mern-app.vercel.app/piechart?month=${monthIndex}`);
            const data = res.data;
            return data;
        } catch (error) {
            // Log the error and return it as the payload in case of an error
            console.log(error);
            return error;
        }
    }
);

// Create a Redux slice for chart data
const pieChartData = createSlice({
    name: 'pieChartData',
    initialState: {
        pieChartData: [],   // Initial state for bar chart data
        isLoading: false,  // Initial loading state
        error: null    // Initial error state
    },
    reducers: {},  // No additional reducers defined
    extraReducers: (builder) => {
        // Handle different actions based on the asynchronous thunk status
        builder
            .addCase(fetchPieChartData.pending, (state) => {
                // Set loading state to true when the fetch is pending
                state.isLoading = true;
            })
            .addCase(fetchPieChartData.fulfilled, (state, action) => {
                // Set loading state to false and update chart data when the fetch is successful
                state.isLoading = false;
                state.chartData = action.payload;
            })
            .addCase(fetchPieChartData.rejected, (state, action) => {
                // Set loading state to false and update error state when the fetch is rejected
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

// Export the reducer and the asynchronous thunk
export default pieChartData.reducer;
export { fetchPieChartData };
