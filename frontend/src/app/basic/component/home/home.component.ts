import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileService } from '../../service/file.service';
import { PdfFile } from '../../../model/pdf-file.model';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = 'app works!';

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000/api/v1';

  // Declare empty list of people
  people: any[] = [];

  public file$: Observable<PdfFile | {}>;
  
  constructor(private http: HttpClient, private fileService: FileService) {}

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    //this.getAllPeople();
    this.file$ = this.fileService.getFileList();
  }


  
  // Add one person to the API
  addPerson(name, age) {
    this.http.post(`${this.API}/users`, {name, age})
      .subscribe(() => {
        this.getAllPeople();
      })
  }

  // Get all users from the API
  getAllPeople() {
    this.http.get(`${this.API}/user`)
      .subscribe((res: any) => {
        console.log(res.data)
        this.people = res.data;
      })
  }

}
