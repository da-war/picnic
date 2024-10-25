import { createAction } from "@reduxjs/toolkit";

// Actions for random GIF fetching
const fetchRandomGifStart = createAction('randomGif/fetchRandomGifStart');
 const fetchRandomGifSuccess = createAction<any>('randomGif/fetchRandomGifSuccess');
const fetchRandomGifFailure = createAction('randomGif/fetchRandomGifFailure');


export {
    fetchRandomGifStart,
    fetchRandomGifFailure,
    fetchRandomGifSuccess,
}