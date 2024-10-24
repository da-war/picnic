import { createAction } from '@reduxjs/toolkit';

// Actions for random GIF fetching
const fetchRandomGifStart = createAction('randomGif/fetchRandomGifStart');
 const fetchRandomGifSuccess = createAction<any>('randomGif/fetchRandomGifSuccess');
const fetchRandomGifFailure = createAction('randomGif/fetchRandomGifFailure');

// Actions for searching GIFs
const startSearch = createAction<string>('searchGif/startSearch');
const searchSuccess = createAction<any>('searchGif/searchSuccess');
const searchFailure = createAction('searchGif/searchFailure');

// Action to reset search state
const resetSearch = createAction('searchGif/resetSearch');


export {
    fetchRandomGifStart,
    fetchRandomGifSuccess,
    fetchRandomGifFailure,
    startSearch,
    searchSuccess,
    searchFailure,
    resetSearch,
}