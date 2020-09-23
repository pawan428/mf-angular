import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorService } from 'src/app/shared/validators/custom-validator.service';
import { UsernameValidator } from 'src/app/shared/validators/username-validators';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/services/user.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ResponseModel } from 'src/app/models/response';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerForm: FormGroup;
  submitted = false;
  returnUrl;
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidatorService,
    public usernameValidator: UsernameValidator,
    private titleService: Title,
    private userService: UserService,
    private messageService: MessageService,
    private loader: LoaderService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    try {
      this.titleService.setTitle('Signup');
      this.registerForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email],
          this.usernameValidator.checkAvailability.bind(this.usernameValidator)],
        password: ['Pawan@123', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
        confirmPassword: ['Pawan@123', [Validators.required]],
      },
        {
          validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
        }
      );
    } catch (err) {
      this.messageService.showMessage(err);
    }
    let token = localStorage.getItem("google-token");
    if (token) {
      this.authService.getGoogleUserinfo(token).subscribe(val => {
        //console.log(val);

        console.log(val);
        this.registerForm.patchValue({
          "firstName": val["given_name"],
          "lastName": val["family_name"],
          "email": val["email"]
        });
        this.registerForm.value.picture = val["picture"]; //adding new property
      },
        (error) => {
          console.log(error);
        });
    }
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.loader.showText('Processing...');
      this.userService.postUser(this.registerForm.value).subscribe(res => {
        let msg: ResponseModel = { ok: res && res["auth"], message: '' }
        if (res && res["auth"]) {
          msg.message = 'Registration Successful, Please login with your email and password.';
          this.registerForm.reset();
          this.router.navigate(['/auth/login']);
          // let token = localStorage.getItem("google-token");
          // this.authService.googleSignin(token).subscribe(val => {
          //   localStorage.setItem("token", token);
          //   this.router.navigate(['/dashboard']);
          // });
          this.submitted = false;
        }
        else
          msg.message = 'Registration Failed';
        this.messageService.showMessage(msg);
        this.loader.hide();
      });
    }
  }
}
