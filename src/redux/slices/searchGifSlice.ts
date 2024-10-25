// searchGifSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchSuccess, searchFailure, startSearch, resetSearch } from '@redux/actions';
import { Gif, SearchGifState } from '@src/constants/types';

// Initial state for search GIF
const initialSearchGifState: SearchGifState = {
  results: null,
  loading: false,
  error: null,
};

// Create the search GIF slice
export const searchGifSlice = createSlice({
  name: 'searchGif',
  initialState: initialSearchGifState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startSearch, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchSuccess, (state, action: PayloadAction<Gif[]>) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchFailure, (state) => {
        state.loading = false;
        state.error = 'Failed to search GIFs.';
      })
      .addCase(resetSearch, (state) => {
        state.results = null;
        state.loading = false;
        state.error = null;
      });
  },
});

// Export the reducer
export const searchGifReducer = searchGifSlice.reducer;
