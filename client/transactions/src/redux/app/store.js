import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from '../features/transactionsSlice'
import currentMonthSlice from '../features/currentMonthSlice'
import statisticsSlice from '../features/statisticsSlice'
import chartDataSlice from '../features/chartDataSlice'


export const store = configureStore({
    reducer: {
        transactions: transactionsReducer,
        currentMonth: currentMonthSlice,
        statistics: statisticsSlice,
        chartData: chartDataSlice
    }
})