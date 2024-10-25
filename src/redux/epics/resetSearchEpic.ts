// resetSearchEpic.ts
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { fetchRandomGifStart, resetSearch } from '../actions';


// Epic to reset search and return to random GIF
export const resetSearchEpic = (action$: any) =>
  action$.pipe(
    ofType(resetSearch.type),
    map(() => fetchRandomGifStart())
  );
