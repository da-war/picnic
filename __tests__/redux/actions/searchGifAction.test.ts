// searchGifAction.test.ts
import { startSearch, searchSuccess, searchFailure } from '@actions/index';

describe('searchGif actions', () => {
  it('should create startSearch action with a search query', () => {
    const query = 'funny';
    const expectedAction = { type: 'searchGif/startSearch', payload: query };
    expect(startSearch(query)).toEqual(expectedAction);
  });

  it('should create searchSuccess action with a payload', () => {
    const gifData = [
      { id: '1', url: 'http://example.com/gif1.gif', title: 'GIF 1' },
      { id: '2', url: 'http://example.com/gif2.gif', title: 'GIF 2' },
    ];
    const expectedAction = { type: 'searchGif/searchSuccess', payload: gifData };
    expect(searchSuccess(gifData)).toEqual(expectedAction);
  });

  it('should create searchFailure action', () => {
    const expectedAction = { type: 'searchGif/searchFailure' };
    expect(searchFailure()).toEqual(expectedAction);
  });
});
