


import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { PdfFile, PdfFileResponse } from "../../model/pdf-file.model";
import { FileService } from "./file.service";



export class FileDataSource implements DataSource<PdfFile> {

    private fileSubject = new BehaviorSubject<PdfFile[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalResultsSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public size$ = this.totalResultsSubject.asObservable();
    
    constructor(private fileService: FileService) {

    }

    loadFiles(sortKey: string, sortDirection: string, pageNumber: number, pageSize: number) {

        this.loadingSubject.next(true);

        this.fileService.getFileList(sortKey, sortDirection, pageNumber, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe( (file: PdfFileResponse) => {this.totalResultsSubject.next(file.totalResults); this.fileSubject.next(file.data)})
            // .subscribe( (file: PdfFileResponse) => this.totalResultsSubject.next(file.totalResults));

    }

    connect(collectionViewer: CollectionViewer): Observable<PdfFile[]> {
        console.log("Connecting data source");
        return this.fileSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.fileSubject.complete();
        this.loadingSubject.complete();
        this.totalResultsSubject.complete();
    }

}

