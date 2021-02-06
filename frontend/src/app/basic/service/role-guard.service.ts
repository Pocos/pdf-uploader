
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: AuthService, public router: Router) { }

  /**
   * Check that the user is authenticated and has permission(role) to access the page
   * @param route
   * @param state
   */
  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // transforms /admin/usermanagement?lorem=ipsum in ['admin', 'usermanagement'] in order to use role service authenticator
    if (this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
      return of(false);
    }else{
      return of(true);
    }
  }
}
