import { createAction } from '@reduxjs/toolkit';

// Actions for random GIF fetching
export const fetchRandomGifStart = createAction('randomGif/fetchRandomGifStart');
export const fetchRandomGifSuccess = createAction<any>('randomGif/fetchRandomGifSuccess');
export const fetchRandomGifFailure = createAction('randomGif/fetchRandomGifFailure');

// Actions for searching GIFs
export const startSearch = createAction<string>('searchGif/startSearch');
export const searchSuccess = createAction<any>('searchGif/searchSuccess');
export const searchFailure = createAction('searchGif/searchFailure');

// Action to reset search state
export const resetSearch = createAction('searchGif/resetSearch');
