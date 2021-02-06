import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../../service/login.service';
import { AuthService } from '../../service/auth.service';

@Component({   selector: 'login',templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        private authService: AuthService,
    ) { 
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.loginService.login(this.f.username.value, this.f.password.value)
            .subscribe(
                res => {
                    // this.router.navigate([this.returnUrl]);
                    this.authService.setToken(res.token);
                this.router.navigate(['home']);
                },
                error => {
                    this.error = error.statusText;
                    this.loading = false;
                });
    }
}
