// randomGifEpic.ts
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from, interval, of } from 'rxjs';
import { fetchRandomGif } from '@services/giphyService';

import { Gif } from '@src/constants/types';
import { mapApiToGif } from '@src/utils';
import { fetchRandomGifStart } from '../actions';

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
