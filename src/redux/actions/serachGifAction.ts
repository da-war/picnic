import { createAction } from "@reduxjs/toolkit";



// Actions for searching GIFs
const startSearch = createAction<string>('searchGif/startSearch');
const searchSuccess = createAction<any>('searchGif/searchSuccess');
const searchFailure = createAction('searchGif/searchFailure');


export {
    startSearch,
    searchSuccess,
    searchFailure
}