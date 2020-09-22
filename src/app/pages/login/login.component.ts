import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/shared/services/message.service';
import { environment } from 'src/environments/environment';
import { AuthService as SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  auth2: any;
  submitted = false;
  returnUrl: string;
  loginForm: FormGroup;
  error: HttpErrorResponse;


  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private authService: AuthService, private titleService: Title, private loaderService: LoaderService,
    private messageService: MessageService, private socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {

    this.titleService.setTitle('Login');
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    //load username if have google token in localstorage
    this.socialAuthService.authState.subscribe((user) => {      
      if (user) {
        this.loginForm.patchValue({ "username": user.email });
        this.authService.googleSignin(user.idToken).subscribe(val => {
        });
      }
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
  get f() {
    return this.loginForm.controls;
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.socialAuthService.authState.subscribe((user) => {
      // this.user = user;
      // this.loggedIn = (user != null);
      if (user) {
        this.loaderService.showText('Checking session...');
        this.authService.googleSignin(user.idToken).subscribe(val => {
          this.loginSuccess(val["token"]);
        },
          (error) => {
            //handle not registered user
            if (error.status === 404) {
              localStorage.setItem("google-token", user.idToken);
              this.router.navigate(['/auth/signup']);
            }
          });
      }
    });
  }

  signInWithFB(): void {
    // this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    // this.socialAuthService.signOut();
  }
  loginSuccess(token: string) {
    localStorage.setItem("token", token);
    this.router.navigateByUrl(this.returnUrl);
  }
  onSubmit() {
    try {
      //JSON.parse('sa');
      this.submitted = true;
      if (this.loginForm.valid) {
        this.loaderService.showText('Validating...');
        let req = this.loginForm.value;

        this.authService.login(req["username"], req["password"]).subscribe((res: HttpErrorResponse) => {
          if (res["auth"]) {
            this.loginSuccess(res["token"]);
          }
          else {
            localStorage.removeItem("token");
          }
        });
      }
    } catch (error) {
      this.messageService.showMessage({ ok: false, message: "Something went wrong!" });
    }
  }

  ngOnDestroy() {
    this.messageService.reset();
    this.loaderService.hide();
  }
}