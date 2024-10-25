// resetSearchAction.test.ts
import { resetSearch } from '@actions/index';

describe('resetSearch action', () => {
  it('should create resetSearch action', () => {
    const expectedAction = { type: 'searchGif/resetSearch' };
    expect(resetSearch()).toEqual(expectedAction);
  });
});
