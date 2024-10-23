// reducers.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchRandomGifSuccess,
  fetchRandomGifFailure,
  searchSuccess,
  searchFailure,
  fetchRandomGifStart,
  startSearch,
} from './actions';
import { Gif } from '@src/constants/types'; // Import Gif type

// Define the types for the random GIF state
interface RandomGifState {
  gif: Gif | null; // Change to Gif type or null
  loading: boolean;
  error: string | null;
}

// Define the types for the search GIF state
interface SearchGifState {
  results: Gif[] | null; // Change to array of Gif or null
  loading: boolean;
  error: string | null;
}

// Define the initial state for random GIF
const initialRandomGifState: RandomGifState = {
  gif: null,
  loading: false,
  error: null,
};

// Define the initial state for search GIF
const initialSearchGifState: SearchGifState = {
  results: null,
  loading: false,
  error: null,
};

// Create the random GIF slice
const randomGifSlice = createSlice({
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
        state.gif = action.payload; // Expecting a Gif type
      })
      .addCase(fetchRandomGifFailure, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch random GIF.';
      });
  }
});

// Create the search GIF slice
const searchGifSlice = createSlice({
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
        state.results = action.payload; // Expecting an array of Gif
      })
      .addCase(searchFailure, (state) => {
        state.loading = false;
        state.error = 'Failed to search GIFs.';
      });
  }
});

// Export the root reducer
export const rootReducer = {
  randomGif: randomGifSlice.reducer,
  searchGif: searchGifSlice.reducer,
};
