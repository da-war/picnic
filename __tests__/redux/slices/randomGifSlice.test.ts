// randomGifSlice.test.ts
import { randomGifSlice } from '@slices/randomGifSlice';
import { fetchRandomGifSuccess, fetchRandomGifFailure, fetchRandomGifStart } from '@actions/index';
import { Gif } from '@src/constants/types';

describe('randomGifSlice', () => {
  const initialState = {
    gif: null,
    loading: false,
    error: null,
  };

  it('should handle fetchRandomGifStart', () => {
    const state = randomGifSlice.reducer(initialState, fetchRandomGifStart());
    expect(state.loading).toBe(true);
  });

  it('should handle fetchRandomGifSuccess', () => {
    const mockGif: Gif = { id: '1', url: 'test-url',rating:'g',title:"Random Gif" };
    const state = randomGifSlice.reducer(initialState, fetchRandomGifSuccess(mockGif));
    expect(state.loading).toBe(false);
    expect(state.gif).toBe(mockGif);
  });

  it('should handle fetchRandomGifFailure', () => {
    const state = randomGifSlice.reducer(initialState, fetchRandomGifFailure());
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to fetch random GIF.');
  });
});
