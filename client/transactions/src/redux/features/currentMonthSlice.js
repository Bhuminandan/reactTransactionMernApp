import { createSlice } from "@reduxjs/toolkit";


export const currentMonthSlice = createSlice({
    name: 'currentMonth',
    initialState: {
        currentMonth: {
            monthIndex: 1,
            month: 'january'
        }
    },
    reducers: {
        setCurrentMonth: (state, action) => {
            state.currentMonth = action.payload
        }
    }
})

export const { setCurrentMonth } = currentMonthSlice.actions;
export default currentMonthSlice.reducer

