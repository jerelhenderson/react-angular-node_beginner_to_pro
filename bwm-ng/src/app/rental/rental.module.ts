import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { NgPipesModule } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';

import { RentalService } from "./shared/rental.service";
import { HelperService } from "../common/service/helper.service";
import { BookingService } from "../booking/shared/booking.service";

import { AuthGuard } from "../auth/shared/auth.guard";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
    {path: 'rentals',
    component: RentalComponent,
    children: [
        { path: '', component: RentalListComponent },
        { path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard] },
        { path: ':rentalId', component: RentalDetailComponent },
        { path: ':city/homes', component: RentalSearchComponent }
  ]}
]

@NgModule({
    declarations: [
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        RentalDetailBookingComponent,
        RentalSearchComponent,
        RentalCreateComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker,
        FormsModule
    ],
    providers: [
        RentalService,
        HelperService,
        BookingService
    ]
})
export class RentalModule {

}