import {createSlice} from '@reduxjs/toolkit';
import {getProducts} from '../Actions/ProductAction';

const initialState = {
  products: [],
  loader: true,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loader = false;
    });
    builder.addCase(getProducts.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loader = false;
      state.products = [];
    });
  },
});

export default productsSlice.reducer;
