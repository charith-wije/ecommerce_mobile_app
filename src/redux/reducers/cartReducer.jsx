import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const isExist = state.cartItems.find(
        item => item.id == action.payload?.id,
      );

      if (isExist) {
        const newSum =
          parseFloat(isExist.sum) +
          parseFloat(action.payload?.price.amount) * action.payload?.units;
        isExist.sum = newSum.toFixed(2);
        isExist.units += action.payload?.units;
      } else {
        state.cartItems.push({
          ...action.payload,
          sum: parseFloat(action.payload?.price.amount) * action.payload?.units,
        });
      }
    },
    removeItem: (state, action) => {
      const isExist = state.cartItems.find(
        item => item.id == action.payload?.id,
      );
      if (isExist && isExist.units !== 1) {
        const newSum =
          parseFloat(isExist.sum) - parseFloat(action.payload?.price.amount);
        isExist.sum = newSum.toFixed(2);
        isExist.units -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          item => item.id !== action.payload?.id,
        );
      }
    },

    removeWholeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload?.id,
      );
    },
  },
});

export const {addItem, removeItem, removeWholeItem} = cartSlice.actions;

export default cartSlice.reducer;
