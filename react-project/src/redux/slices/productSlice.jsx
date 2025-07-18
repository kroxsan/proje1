import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



const initialState = {
  product: [],
  selectedProduct: {},
  loading: false,
}

const BASE_URL = 'https://fakestoreapi.com'


export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
  const response= await axios.get(`${BASE_URL}/products`)
  return response.data;
})


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      setSelectedProduct: (state, action) => {
        state.selectedProduct = action.payload;
      }
    
    },
    extraReducers : (builder)=>{
      builder.addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })  
      builder.addCase(getAllProducts.fulfilled, (state,action) => {
        state.loading = false;
        state.product = action.payload;
      })
    }
})

export const { setSelectedProduct } = productSlice.actions

export default productSlice.reducer