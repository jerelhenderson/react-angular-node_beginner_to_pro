import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'bwm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errors: any[] = [];
    notifyMessage: string = '';

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.initForm();

        this.route.params.subscribe((params) => {
            if (params['registered'] === 'Success') {
                this.notifyMessage = "You have successfully registered. Please login now!";
            }
        })
    }

    initForm() {
        this.loginForm = this.fb.group({
            email: ['',
                [Validators.required,
                Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
            password: ['', Validators.required]
        })
    }

    isInvalidForm(fieldName): boolean {
        return this.loginForm.controls[fieldName].invalid && (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
    }

    isRequired(fieldName): boolean {
        return this.loginForm.controls[fieldName].errors.required;
    }

    login() {
        this.authService.login(this.loginForm.value).subscribe((token) => {
        this.router.navigate(['/rentals']);
        },
        (errorResponse) => {
          this.errors = errorResponse.error.errors;
        })
    }
}
