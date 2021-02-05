import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { merge, Observable } from 'rxjs';
import { FileService } from '../../service/file.service';
import { PdfFile } from '../../../model/pdf-file.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FileDataSource } from '../../service/file.datasource';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource: FileDataSource;
  displayedColumns = ["filename", "fileSize", "filePath", "created_at", "modified_at"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.dataSource = new FileDataSource(this.fileService);
    this.dataSource.loadFiles('filename','asc',0,3);
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

loadFilePage() {
  console.log(this.dataSource);
    this.dataSource.loadFiles(
        this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize);
}
}
