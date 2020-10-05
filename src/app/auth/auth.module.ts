import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

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
    ]
})
export class AuthModule { }