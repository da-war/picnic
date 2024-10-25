import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { randomGifEpic, resetSearchEpic, searchGifEpic } from './epics';
import { randomGifReducer } from './slices/randomGifSlice';
import { searchGifReducer } from './slices/searchGifSlice';

// Combine the reducers into a rootReducer object
const rootReducer = {
  randomGif: randomGifReducer,
  searchGif: searchGifReducer,
};

// Create the epic middleware
const epicMiddleware = createEpicMiddleware();

// Configure the store
export const store = configureStore({
  reducer: rootReducer, // Use the combined reducers
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

// Run the epics
epicMiddleware.run(randomGifEpic);
epicMiddleware.run(searchGifEpic);
epicMiddleware.run(resetSearchEpic);

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
