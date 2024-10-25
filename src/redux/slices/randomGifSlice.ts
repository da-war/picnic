// randomGifSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRandomGifSuccess, fetchRandomGifFailure, fetchRandomGifStart } from '@redux/actions';
import { Gif, RandomGifState } from '@src/constants/types';

// Initial state for random GIF
const initialRandomGifState: RandomGifState = {
  gif: null,
  loading: false,
  error: null,
};

// Create the random GIF slice
export const randomGifSlice = createSlice({
  name: 'randomGif',
  initialState: initialRandomGifState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomGifStart, (state) => {
        state.loading = true;
      })
      .addCase(fetchRandomGifSuccess, (state, action: PayloadAction<Gif>) => {
        state.loading = false;
        state.gif = action.payload;
      })
      .addCase(fetchRandomGifFailure, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch random GIF.';
      });
  },
});

// Export the reducer
export const randomGifReducer = randomGifSlice.reducer;
