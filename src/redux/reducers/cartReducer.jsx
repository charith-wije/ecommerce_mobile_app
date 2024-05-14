import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cartItems.push({
        ...action.payload,
      });
    },
  },
});

export const {addItem} = cartSlice.actions;

export default cartSlice.reducer;
