// searchGifEpic.ts
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { fetchSearchGifs } from '@services/giphyService';
import {
  searchFailure,
  searchSuccess,
  startSearch,
} from '@redux/actions';
import { Gif } from '@src/constants/types';


const mapApiToGif = (data: any): Gif => ({
  id: data.id,
  url: data.url,
  rating: data.rating,
  title: data.title,
  // Use the non-animated version of the image
    image: data.images.original.url, // Fallback to webp if fixed_height_small is not available
  stillImage:data.images.fixed_height_still.url || data.images.fixed_height_small_still.url
});


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
