import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME = 'jwt_token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string|null {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_NAME);
  }


  getUsernameFromToken(): string {
    if (!this.isTokenExpired()) {
      const token = this.getToken();
      // decode the token to get its payload
      const tokenPayload: any = jwt_decode(token);
      return tokenPayload.username;
    } else {
      return '';
    }
  }


  getTokenExpirationDate(token: string): Date|null {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
       return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (!date) { // Null or undefined token date are traited as lifetime token
       return false;
    } else {
      return !(date.valueOf() > new Date().valueOf());
    }
  }

}
