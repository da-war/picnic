// randomGifAction.test.ts
import { fetchRandomGifStart, fetchRandomGifSuccess, fetchRandomGifFailure } from '@actions/index';

describe('randomGif actions', () => {
  it('should create fetchRandomGifStart action', () => {
    const expectedAction = { type: 'randomGif/fetchRandomGifStart' };
    expect(fetchRandomGifStart()).toEqual(expectedAction);
  });

  it('should create fetchRandomGifSuccess action with payload', () => {
    const gifData = { id: '1', url: 'http://example.com/gif1.gif', title: 'Sample GIF' };
    const expectedAction = { type: 'randomGif/fetchRandomGifSuccess', payload: gifData };
    expect(fetchRandomGifSuccess(gifData)).toEqual(expectedAction);
  });

  it('should create fetchRandomGifFailure action', () => {
    const expectedAction = { type: 'randomGif/fetchRandomGifFailure' };
    expect(fetchRandomGifFailure()).toEqual(expectedAction);
  });
});
