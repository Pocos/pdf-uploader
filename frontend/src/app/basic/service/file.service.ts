import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PdfFileResponse } from '../../model/pdf-file.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  public getFileList(sortKey = 'filename', sortDirection = 'asc', pageNumber = 0, pageSize = 3): Observable<PdfFileResponse> {
    const url = `http://localhost:3000/api/v1/file`;
    return this.http.get<PdfFileResponse>(url, {
      params: new HttpParams()
        .set('sortKey', sortKey)
        .set('sortDirection', sortDirection)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    })
    /*.pipe(
      map(res =>  res.data)
  );;*/
  }

  public upload(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post('http://localhost:3000/api/v1/file', formData, {})
      // .map(() => { return true; })
      //.catch((e) => console.log(e));
  }
}
