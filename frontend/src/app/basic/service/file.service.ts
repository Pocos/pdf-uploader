import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PdfFile } from '../../model/pdf-file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  public getFileList(): Observable<PdfFile[]> {
    const url = `http://localhost:3000/api/v1/file`;
    return this.http.get<PdfFile[]>(url, {});
  }

}
