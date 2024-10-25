// searchGifSlice.test.ts
import { searchSuccess, searchFailure, startSearch, resetSearch } from '@redux/actions';
import { Gif } from '@src/constants/types';
import { searchGifSlice } from '@src/redux/reducer';

describe('searchGifSlice', () => {
  const initialState = {
    results: null,
    loading: false,
    error: null,
  };

 it('should handle startSearch', () => {
  const searchTerm = 'test query'; // Add a sample search term
  const nextState = searchGifSlice.reducer(initialState, startSearch(searchTerm));
  expect(nextState).toEqual({
    results: null,
    loading: true,
    error: null,
  });
});

  it('should handle searchSuccess', () => {
    const mockResults: Gif[] = [{ id: '1', url: 'test-url',rating:'g',title:"Random Gif" }];
    const state = searchGifSlice.reducer(initialState, searchSuccess(mockResults));
    expect(state.loading).toBe(false);
    expect(state.results).toBe(mockResults);
  });

  it('should handle searchFailure', () => {
    const state = searchGifSlice.reducer(initialState, searchFailure());
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to search GIFs.');
  });

  it('should handle resetSearch', () => {
    const state = searchGifSlice.reducer(initialState, resetSearch());
    expect(state.results).toBe(null);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });
});
