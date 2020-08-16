import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorService } from 'src/app/shared/validators/custom-validator.service';
import { UsernameValidator } from 'src/app/shared/validators/username-validators';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/services/user.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { LoaderService } from 'src/app/shared/services/loader.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidatorService,
    public usernameValidator: UsernameValidator,
    private titleService: Title,
    private userService: UserService,
    private errorService: ErrorService,
    private loader: LoaderService

  ) { }

  ngOnInit() {
    try {
      this.titleService.setTitle('Signup');
      this.registerForm = this.fb.group({
        firstName: ['Pawan', Validators.required],
        lastName: ['Sharma', Validators.required],
        email: ['pawan@gmail.comm', [Validators.required, Validators.email],
          this.usernameValidator.checkAvailability.bind(this.usernameValidator)],
        password: ['Pawan@123', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
        confirmPassword: ['Pawan@123', [Validators.required]],
      },
        {
          validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
        }
      );
    } catch (err) {
      this.errorService.catchError(err);
    }
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loader.show('Submitting, Please wait', true);
      this.userService.postUser(this.registerForm.value).subscribe(res => {
        console.log(res);
        this.loader.hide();

      }, err => {
        this.loader.hide();
        this.errorService.catchError(err);

      });
    }
  } 
}
