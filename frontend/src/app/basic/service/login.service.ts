import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PdfFileResponse } from '../../model/pdf-file.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
        name: username,
        password: password
    };
    return this.http.post('http://localhost:3000/api/v1/login', body);
}
}
