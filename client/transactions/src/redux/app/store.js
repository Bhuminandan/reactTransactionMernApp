// Import the configureStore function from @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import reducers from your features/slices
import transactionsReducer from '../features/transactionsSlice';
import currentDataSlice from '../features/currentDataSlice';
import statisticsSlice from '../features/statisticsSlice';
import chartDataSlice from '../features/chartDataSlice';
import pieChartDataSlice from '../features/pieChartDataSlice';
import sideBarSlice from '../features/sideBarSlice';

// Create the Redux store using configureStore
export const store = configureStore({
    // Combine reducers for different parts of the application state
    reducer: {
        transactions: transactionsReducer, // Reducer for transaction-related state
        currentData: currentDataSlice,   // Reducer for current month-related state
        statistics: statisticsSlice,       // Reducer for statistics-related state
        chartData: chartDataSlice,         // Reducer for chart data-related state
        pieChartData: pieChartDataSlice,   // Reducer for pie chart-related state
        sideBar: sideBarSlice,             // Reducer for sidebar-related state

    }
});
