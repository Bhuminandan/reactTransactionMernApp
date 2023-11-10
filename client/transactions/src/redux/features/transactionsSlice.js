import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async (pageNum = 1) => {

        console.log(pageNum,);
        console.log(`http://localhost:8000/find?page=${pageNum}&search=for`);
        try {
            const res = await axios.get(`http://localhost:8000/find?page=1&search=for`)
            console.log(res.data);
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)


export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        status: 'idle',
        transactions: [], // Adjust this based on your actual data structure
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.transactions = action.payload
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})


export default transactionsSlice.reducer
