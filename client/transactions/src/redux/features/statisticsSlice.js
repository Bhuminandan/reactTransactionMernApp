import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const fetchStatistics = createAsyncThunk(
    'statistics/fetchStatistics',
    async ({ monthIndex }) => {

        console.log(monthIndex);
        try {
            const res = await axios.get(`http://localhost:8000/statistics?month=${monthIndex}`);
            const data = res.data;
            console.log(data);
            return data
        } catch (error) {
            console.log(error)
            return error;
        }
    }
)

const initialState = {
    isLoading: false,
    error: null,
    statisStics: {
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0
    },
}

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatistics.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchStatistics.fulfilled, (state, action) => {
                state.isLoading = false
                state.statisStics = action.payload
            })
            .addCase(fetchStatistics.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default statisticsSlice.reducer
export { fetchStatistics }
