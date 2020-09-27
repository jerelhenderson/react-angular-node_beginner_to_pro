import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalComponent } from './rental/rental.component';
import { TempComponent } from './temp/temp.component';

import { RentalModule } from './rental/rental.module';

const routes: Routes = [
  {path: '', component: RentalComponent},
  {path: 'temp', component: TempComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TempComponent
  ],
  imports: [
    RentalModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
