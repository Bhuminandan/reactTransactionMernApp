// Import necessary dependencies from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Create a Redux slice for the current month
export const currentMonthSlice = createSlice({
    name: 'currentMonth',
    initialState: {
        currentMonth: {
            monthIndex: 1,   // Initial month index
            month: 'january'  // Initial month name
        }
    },
    reducers: {
        // Reducer function to set the current month based on the provided payload
        setCurrentMonth: (state, action) => {
            state.currentMonth = action.payload;
        }
    }
});

// Export the action creator and the reducer
export const { setCurrentMonth } = currentMonthSlice.actions;
export default currentMonthSlice.reducer;
