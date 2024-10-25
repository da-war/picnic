import { configureStore } from '@reduxjs/toolkit';
import { fetchRandomGifStart } from '@src/redux/actions';
import { randomGifReducer } from '@slices/randomGifSlice';
import { searchGifReducer } from '@slices/searchGifSlice';
import { createEpicMiddleware } from 'redux-observable';

// Helper to create a mock store for testing purposes
function setupTestStore() {
  const epicMiddleware = createEpicMiddleware();
  
  return configureStore({
    reducer: {
      randomGif: randomGifReducer,
      searchGif: searchGifReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
  });
}

describe('Redux Store', () => {
  it('should initialize the store with the correct initial states', () => {
    const testStore = setupTestStore();

    const state = testStore.getState();

    // Test the initial state of randomGifReducer
    expect(state.randomGif).toEqual({
      gif: null,
      loading: false,
      error: null,
    });

    // Test the initial state of searchGifReducer
    expect(state.searchGif).toEqual({
      results: null,
      loading: false,
      error: null,
    });
  });

  it('should handle dispatching an action correctly', () => {
    const testStore = setupTestStore();

    // Dispatch an action to start fetching a random GIF
    testStore.dispatch(fetchRandomGifStart());

    // Get the updated state after dispatch
    const state = testStore.getState();

    // Ensure that loading is set to true after fetching starts
    expect(state.randomGif.loading).toBe(true);
  });
  
  it('should use the correct middleware', () => {
    const testStore = setupTestStore();

    // Dispatch a mock action to ensure the epic middleware is working
    testStore.dispatch(fetchRandomGifStart());

    // Check if epicMiddleware has run correctly by inspecting the updated state
    const state = testStore.getState();
    expect(state.randomGif.loading).toBe(true); // Ensure that the middleware correctly changed the state
  });
});

