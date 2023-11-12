// Import necessary dependencies from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define an asynchronous thunk for fetching bar chart data
const fetchBarChartData = createAsyncThunk(
    'chartData/fetchBarChartData',
    async ({ monthIndex }) => {
        try {
            // Fetch bar chart data from the API based on the provided monthIndex
            const res = await axios.get(`https://react-transaction-mern-app.vercel.app/barchart?month=${monthIndex}`);
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
const chartDataSlice = createSlice({
    name: 'chartData',
    initialState: {
        chartData: [],   // Initial state for bar chart data
        isLoading: false,  // Initial loading state
        error: null    // Initial error state
    },
    reducers: {},  // No additional reducers defined
    extraReducers: (builder) => {
        // Handle different actions based on the asynchronous thunk status
        builder
            .addCase(fetchBarChartData.pending, (state) => {
                // Set loading state to true when the fetch is pending
                state.isLoading = true;
            })
            .addCase(fetchBarChartData.fulfilled, (state, action) => {
                // Set loading state to false and update chart data when the fetch is successful
                state.isLoading = false;
                state.chartData = action.payload;
            })
            .addCase(fetchBarChartData.rejected, (state, action) => {
                // Set loading state to false and update error state when the fetch is rejected
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

// Export the reducer and the asynchronous thunk
export default chartDataSlice.reducer;
export { fetchBarChartData };
