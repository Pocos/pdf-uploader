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

  public getFileList(sortKey = 'filename', sortDirection = 'asc', pageNumber = 0, pageSize = 3, filename?: string ): Observable<PdfFileResponse> {
    const url = `http://localhost:3000/api/v1/file`;
    let params = new HttpParams()
        .set('sortKey', sortKey)
        .set('sortDirection', sortDirection)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    if(filename){
      params = new HttpParams()
        .set('sortKey', sortKey)
        .set('sortDirection', sortDirection)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('filename', filename);
    }
    return this.http.get<PdfFileResponse>(url, {params})
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

  public editFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post('http://localhost:3000/api/v1/file', formData, {})
    // .map(() => { return true; })
    //.catch((e) => console.log(e));
  }

  public deleteFile(id: string) {
    return this.http
      .delete(`http://localhost:3000/api/v1/file/${id}`, {});
  }
}
