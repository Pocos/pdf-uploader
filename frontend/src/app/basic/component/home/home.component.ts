import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { merge, Observable } from 'rxjs';
import { FileService } from '../../service/file.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FileDataSource } from '../../service/file.datasource';
import { tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource: FileDataSource;
  displayedColumns = ["filename", "fileSize", "created_at", "modified_at", "thumbnail", "download", "actions"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  fileToUpload: File = null;

  src: string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  constructor(private fileService: FileService, private modalService: NgbModal) { }

  ngOnInit() {
    this.dataSource = new FileDataSource(this.fileService);
    this.dataSource.loadFiles('created_at', 'desc', 0, 5);
  }

  open(filePath, content) {
    this.src = 'http://localhost:3000/api/v1/file'+ filePath;
    console.log(filePath);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngAfterViewInit() {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadFilePage())
      )
      .subscribe();
  }

  onSelect(event) {
    console.log(event);
    // this.files.push(...event.addedFiles);
  }

  loadFilePage() {
    console.log(this.dataSource);
    this.dataSource.loadFiles(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  // file from event.target.files[0]
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileService.upload(this.fileToUpload).subscribe(data => {
      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      this.loadFilePage();
    })
  }

  uploadFile(event) {
    if (event[0].type === 'application/pdf') {
      this.fileService.upload(event[0]).subscribe(data => {
        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.loadFilePage();
      })
    }
  }
}
