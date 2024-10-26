// randomGifEpic.ts
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from, interval, of } from 'rxjs';
import { fetchRandomGif } from '@services/giphyService';
import {
  fetchRandomGifFailure,
  fetchRandomGifStart,
  fetchRandomGifSuccess,
} from '@redux/actions';
import { Gif } from '@src/constants/types';
const mapApiToGif = (data: any): Gif => ({
  id: data.id,
  url: data.url,
  rating: data.rating,
  title: data.title,
  // Use the non-animated version of the image
    image: data.images.original.url, 
  stillImage:data.images.fixed_height_still.url || data.images.fixed_height_small_still.url // Fallback to webp if fixed_height_small is not available
});

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
