import {
  fetchRandomGifStart,
  fetchRandomGifSuccess,
  fetchRandomGifFailure,
  startSearch,
  searchSuccess,
  searchFailure,
} from '@src/redux/actions';
import { Gif } from '@src/constants/types';
import { randomGifSlice, searchGifSlice } from '@src/redux/reducer';

describe('randomGifSlice reducer', () => {
  const initialRandomGifState = {
    gif: null,
    loading: false,
    error: null,
  };

  it('should handle fetchRandomGifStart', () => {
    const nextState = randomGifSlice.reducer(initialRandomGifState, fetchRandomGifStart());
    expect(nextState).toEqual({
      gif: null,
      loading: true,
      error: null,
    });
  });

  it('should handle fetchRandomGifSuccess', () => {
    const gif: Gif = { title: 'Test GIF', url: 'test-url', image: 'test-image', rating: 'g' };
    const nextState = randomGifSlice.reducer(initialRandomGifState, fetchRandomGifSuccess(gif));
    expect(nextState).toEqual({
      gif,
      loading: false,
      error: null,
    });
  });

  it('should handle fetchRandomGifFailure', () => {
    const nextState = randomGifSlice.reducer(initialRandomGifState, fetchRandomGifFailure());
    expect(nextState).toEqual({
      gif: null,
      loading: false,
      error: 'Failed to fetch random GIF.',
    });
  });
});

describe('searchGifSlice reducer', () => {
  const initialSearchGifState = {
    results: null,
    loading: false,
    error: null,
  };

 it('should handle startSearch', () => {
  const searchTerm = 'test query'; // Add a sample search term
  const nextState = searchGifSlice.reducer(initialSearchGifState, startSearch(searchTerm));
  expect(nextState).toEqual({
    results: null,
    loading: true,
    error: null,
  });
});

  it('should handle searchSuccess', () => {
    const gifs: Gif[] = [
      { title: 'Test GIF 1', url: 'test-url-1', image: 'test-image-1', rating: 'g' },
      { title: 'Test GIF 2', url: 'test-url-2', image: 'test-image-2', rating: 'pg' }
    ];
    const nextState = searchGifSlice.reducer(initialSearchGifState, searchSuccess(gifs));
    expect(nextState).toEqual({
      results: gifs,
      loading: false,
      error: null,
    });
  });

  it('should handle searchFailure', () => {
    const nextState = searchGifSlice.reducer(initialSearchGifState, searchFailure());
    expect(nextState).toEqual({
      results: null,
      loading: false,
      error: 'Failed to search GIFs.',
    });
  });
});
