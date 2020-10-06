import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './shared/auth.service';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
]

@NgModule({
    declarations: [
      LoginComponent,
      RegisterComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }