// Import necessary dependencies from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Create a Redux slice for the current month
export const currentDataSlice = createSlice({
    name: 'currentData',
    initialState: {
        currentMonth: {
            monthIndex: 0,   // Initial month index
            month: 'january'  // Initial month name
        },
        currentCategory: {
            cureentCatergory: 'all'
        },
        currentSoldFilter: {
            currentSoldFilter: 'all'
        }
    },
    reducers: {
        // Reducer function to set the current month based on the provided payload
        setCurrentMonth: (state, action) => {
            state.currentMonth = action.payload;
        },
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload
        },
        setCurrentSoldFilter: (state, action) => {
            state.currentSoldFilter = action.payload;
        }

    }
});

// Export the action creator and the reducer
export const { setCurrentMonth, setCurrentCategory, setCurrentSoldFilter } = currentDataSlice.actions;
export default currentDataSlice.reducer;
