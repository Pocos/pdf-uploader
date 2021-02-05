import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // add http client module

import { AppComponent } from './app.component';
import { HomeComponent } from './basic/component/home/home.component';
import { AppPreloadingStrategy } from './app.preloading.strategy';
import { AppRoutingModule } from './app-routing.module';

// import { LoginComponent } from './basic/component/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: AppPreloadingStrategy, useClass: AppPreloadingStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }