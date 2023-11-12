import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const fetchBarChartData = createAsyncThunk(
    'chartData/fetchBarChartData',
    async ({ monthIndex }) => {

        try {
            const res = await axios.get(`http://localhost:8000/barchart?month=${monthIndex}`)
            const data = res.data
            return data
        } catch (error) {
            console.log(error);
            return error
        }
    }
)

const chartDataSlice = createSlice({
    name: 'chartData',
    initialState: {
        chartData: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBarChartData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchBarChartData.fulfilled, (state, action) => {
                state.isLoading = false
                state.chartData = action.payload
            })
            .addCase(fetchBarChartData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default chartDataSlice.reducer
export { fetchBarChartData }