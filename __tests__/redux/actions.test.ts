import {
  fetchRandomGifStart,
  fetchRandomGifSuccess,
  fetchRandomGifFailure,
} from '@src/redux/actions';

describe('Redux Actions', () => {
  it('should create an action to start fetching random GIF', () => {
    const expectedAction = {
      type: 'randomGif/fetchRandomGifStart',
    };
    expect(fetchRandomGifStart()).toEqual(expectedAction);
  });

  it('should create an action to fetch random GIF success', () => {
    const gif = { title: 'Test', url: 'test-url', image: 'test-image', rating: 'g' };
    const expectedAction = {
      type: 'randomGif/fetchRandomGifSuccess',
      payload: gif,
    };
    expect(fetchRandomGifSuccess(gif)).toEqual(expectedAction);
  });

  it('should create an action to fetch random GIF failure', () => {
    const error: any = 'Network Error';  // Cast the error as any
    const expectedAction = {
      type: 'randomGif/fetchRandomGifFailure',
      payload: error,
    };
    expect(fetchRandomGifFailure(error)).toEqual(expectedAction);
  });
});
