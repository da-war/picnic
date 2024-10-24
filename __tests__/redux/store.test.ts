// __tests__/redux/store.test.ts
import {
  fetchRandomGifStart,
  startSearch,
  searchSuccess,
  searchFailure,
  resetSearch,
} from '@redux/actions'; // Adjust the path as necessary
import { store } from '@redux/store'; // Adjust the path as necessary
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Gif } from '@src/constants/types';

const mockAxios = new MockAdapter(axios);

describe('Redux Store', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should handle search GIF failure', async () => {
    // Simulate a network error
    mockAxios.onGet(/search/).networkError();

    // Dispatch the startSearch action
    store.dispatch(startSearch('funny'));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const state = store.getState();
    expect(state.searchGif.error).toBe('Failed to search GIFs.'); // Expecting the error message
    expect(state.searchGif.loading).toBe(false);
  });

  it('should handle reset search', () => {
    // First, simulate a search success
    const mockGifs: Gif[] = [
      {
        id: '1',
        url: 'url1',
        rating: 'g',
        title: 'Test GIF 1',
        image: 'image1',
        stillImage: 'still-image1',
      },
      {
        id: '2',
        url: 'url2',
        rating: 'pg',
        title: 'Test GIF 2',
        image: 'image2',
        stillImage: 'still-image2',
      },
    ];

    // Dispatch a search success action
    store.dispatch(searchSuccess(mockGifs));

    let state = store.getState();
    expect(state.searchGif.results).toEqual(mockGifs);

    // Now dispatch the reset search action
    store.dispatch(resetSearch());

    // Check the state after reset
    state = store.getState();
    expect(state.searchGif.results).toBeNull(); // Expecting results to be null
    expect(state.searchGif.loading).toBe(false);
    expect(state.searchGif.error).toBeNull();
  });
});
