import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/shared/services/message.service';
import { environment } from 'src/environments/environment';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
 
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
    private messageService: MessageService,private socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {

    this.titleService.setTitle('Login');
    this.loginForm = this.fb.group({
      username: ['pawan@gmail.com', [Validators.required, Validators.email]],
      password: ['Pawan@123', Validators.required]
    });
    this.socialAuthService.authState.subscribe((user) => {
      // this.user = user;
      // this.loggedIn = (user != null);
      console.log('user',user);
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
  get f() {
    return this.loginForm.controls;
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.socialAuthService.signOut();
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
            localStorage.setItem("token", res["token"]);
            this.router.navigateByUrl(this.returnUrl);
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