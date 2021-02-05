import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, timer, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

/**
 * This strategy checks two boolean:
 * - preload — if I want to preload that module or not
 * - delay - if I want to load as soon as possible or with a delay
 *
 * If I specified only the preload boolean (route.data.preload) I would call only load() method.
 * Since I wish to specify also the delay boolean (route.delay) I create a loadRoute function that takes an argument,
 * the delay property.
 * If delay is false I call the load function right away. If delay is true an observable that emits a value
 * after an interval is created, with the timer method, and the result is merged in order to call the load method.
 */

 export class AppPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        const loadRoute = (delay) => delay
            ? timer(150).pipe(mergeMap(_ => load()))
            : load();
        return route.data && route.data.preload
            ? loadRoute(route.data.delay)
            : of(null);
      }
}
