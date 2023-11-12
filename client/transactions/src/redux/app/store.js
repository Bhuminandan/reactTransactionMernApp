// Import the configureStore function from @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import reducers from your features/slices
import transactionsReducer from '../features/transactionsSlice';
import currentMonthSlice from '../features/currentMonthSlice';
import statisticsSlice from '../features/statisticsSlice';
import chartDataSlice from '../features/chartDataSlice';

// Create the Redux store using configureStore
export const store = configureStore({
    // Combine reducers for different parts of the application state
    reducer: {
        transactions: transactionsReducer, // Reducer for transaction-related state
        currentMonth: currentMonthSlice,   // Reducer for current month-related state
        statistics: statisticsSlice,       // Reducer for statistics-related state
        chartData: chartDataSlice          // Reducer for chart data-related state
    }
});
