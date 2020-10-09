import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';

import { RentalModule } from './rental/rental.module';
import { AuthModule } from './auth/auth.module';
import { ManageModule } from './manage/manage.module';

const routes: Routes = [
  {path: '', redirectTo: '/rentals', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    AuthModule,
    RentalModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    ManageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }