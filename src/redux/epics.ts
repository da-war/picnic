// epics.ts
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from, interval, of } from 'rxjs';
import { fetchRandomGif, fetchSearchGifs } from '@services/giphyService';
import {
  fetchRandomGifFailure,
  fetchRandomGifStart,
  fetchRandomGifSuccess,
  resetSearch,
  searchFailure,
  searchSuccess,
  startSearch,
} from './actions';
import { Gif } from '@src/constants/types';
import { mapApiToGif } from '@src/utils';


// Epic to fetch random GIF every 10 seconds
export const randomGifEpic = (action$: any) =>
  action$.pipe(
    ofType(fetchRandomGifStart.type),
    switchMap(() =>
      interval(10000).pipe(
        switchMap(() =>
          from(fetchRandomGif()).pipe(
            map((response) => {
              const gifData = response.data.data; // Giphy API response structure
              const gif: Gif = mapApiToGif(gifData); // Map to Gif type
              return fetchRandomGifSuccess(gif); // Dispatch success action with mapped Gif
            }),
            catchError((error) => {
              console.error('Error fetching random GIF:', error);
              return of(fetchRandomGifFailure());
            })
          )
        )
      )
    )
  );

// Epic to handle search with debouncing
export const searchGifEpic = (action$: any) =>
  action$.pipe(
    ofType(startSearch.type),
    debounceTime(300), // Debounce input by 300ms
    switchMap((action: any) =>
      from(fetchSearchGifs(action.payload)).pipe(
        map((response) => {
          const gifs: Gif[] = response.data.data.map(mapApiToGif); // Map each search result to Gif type
          return searchSuccess(gifs); // Dispatch success action with Gif array
        }),
        catchError((error) => {
          console.error('Error searching GIFs:', error);
          return of(searchFailure());
        })
      )
    )
  );

// Epic to reset search and return to random GIF
export const resetSearchEpic = (action$: any) =>
  action$.pipe(
    ofType(resetSearch.type),
    map(() => fetchRandomGifStart())
  );
