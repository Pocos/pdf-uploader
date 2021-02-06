import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpRequest, HttpInterceptor, HttpHandler, HttpEvent} from '@angular/common/http';
import { AuthService } from '../basic/service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = this.auth.getToken();

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    'Bearer ' + idToken)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
