import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('getProducts', async () => {
  try {
    const {data} = await axios.get(
      'https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json',
    );
    return data;
  } catch (err) {
    console.log(err);
  }
});
