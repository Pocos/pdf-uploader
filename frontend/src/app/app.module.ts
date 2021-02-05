import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // add http client module

import { AppComponent } from './app.component';
import { HomeComponent } from './basic/component/home/home.component';
import { AppPreloadingStrategy } from './app.preloading.strategy';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { DragDropDirective } from './drag-drop.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';
// import { LoginComponent } from './basic/component/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DragDropDirective,
    // LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    BrowserAnimationsModule,
    NgbModule, PdfViewerModule
  ],
  providers: [
    {provide: AppPreloadingStrategy, useClass: AppPreloadingStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }