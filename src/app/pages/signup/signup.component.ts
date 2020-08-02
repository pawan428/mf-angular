import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorService } from 'src/app/shared/validators/custom-validator.service';
import { UsernameValidator } from 'src/app/shared/validators/username-validators';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/services/user.service';
import { Error } from '../../models/error';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  error: Error;
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidatorService,
    public usernameValidator: UsernameValidator,
    private titleService: Title,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Signup');

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email],
        this.usernameValidator.checkAvailability.bind(this.usernameValidator)],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      let user:User=this.registerForm.value;
      user.role="user";
      
      this.userService.postUser(this.registerForm.value).subscribe(res => {
        this.error = res[0];
        if (this.error.errorCode == 0) {
          this.registerForm.reset();
        }
      });
    }
  }
}
