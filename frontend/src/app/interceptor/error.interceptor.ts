import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Router} from '@angular/router';
import { tap } from 'rxjs/operators';
import {HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { AuthService } from '../basic/service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService, public router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Manipulate the response. Do nothing for now
        }
        }, (err: any) => {
          // Centralized point to handle all server errors


          if (err instanceof HttpErrorResponse) {

             // Redirect to login route if 401 happens
            if (err.status === 401) {
              this.auth.clearToken();
              this.router.navigate(['login']);
            } else {
              console.log('Errore:' + err.error.errorCode);
              // Any other error
            }
          }
        }));
    }
}
