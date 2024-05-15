import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import productsSlice from './reducers/productReducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsSlice,
  },
});
