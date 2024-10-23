import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from './reducer';
import { randomGifEpic, resetSearchEpic, searchGifEpic } from './epics';

// Create the epic middleware
const epicMiddleware = createEpicMiddleware();

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
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
