import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ManageComponent } from './manage.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';

import { AuthGuard } from '../auth/shared/auth.guard';

export const routes: Routes = [
    {
        path: 'manage',
        component: ManageComponent,
        children: [
            { path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard] },
            { path: 'bookings', component: ManageBookingComponent, canActivate: [AuthGuard] }
        ]
    }
]

@NgModule({
    declarations: [
        ManageComponent,
        ManageRentalComponent,
        ManageBookingComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    providers: [
    ]
})
export class ManageModule { }