import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async ({ currentPage, searchedTerm }) => {
        try {
            const res = await axios.get(`http://localhost:8000/find?page=${currentPage}&search=${searchedTerm}`);
            const data = res.data;
            console.log(data);
            return data
        } catch (error) {
            console.log(error)
        }
    }
)


export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        isLoading: false,
        transactions: [], // Adjust this based on your actual data structure
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isLoading = false
                state.transactions = action.payload
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})


export default transactionsSlice.reducer
