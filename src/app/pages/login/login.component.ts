import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { User } from 'src/app/models/user';
import { CustomValidatorService } from 'src/app/shared/validators/custom-validator.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilService } from 'src/app/shared/services/util.service';
import { ErrorModel } from 'src/app/models/error';
import { ErrorService } from 'src/app/shared/services/error.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  returnUrl: string;
  loginForm: FormGroup;
  error: HttpErrorResponse;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private authService: AuthService, private titleService: Title, private loaderService: LoaderService,
    private errorService: ErrorService
  ) {
  }
  ngOnInit() {
    this.titleService.setTitle('Login');
    this.loginForm = this.fb.group({
      username: ['pawan@gmail.com', [Validators.required, Validators.email]],
      password: ['Pawan@123', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    try {
      // JSON.parse('sa');
      this.submitted = true;
      if (this.loginForm.valid) {
        this.loaderService.show('Logging in, please wait!', true);
        let req = this.loginForm.value;
        this.authService.login(req["username"], req["password"]).subscribe((res: HttpErrorResponse) => {
          if (res["auth"]) {
            localStorage.setItem("token", res["token"]);
            this.router.navigateByUrl(this.returnUrl);
          }
          else {
            localStorage.removeItem("token");
          }
        },
          (err) => {
            this.errorService.handleLoginError(err);
            this.loaderService.hide();

          });
      }
    } catch (error) {
      this.errorService.catchError(error);
    }
  }

  // ngOnDestroy() {
  //   this.errorService.reset();
  //   this.loaderService.hide();
  // }
}