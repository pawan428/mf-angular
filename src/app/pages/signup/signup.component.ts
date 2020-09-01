import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorService } from 'src/app/shared/validators/custom-validator.service';
import { UsernameValidator } from 'src/app/shared/validators/username-validators';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/services/user.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ResponseModel } from 'src/app/models/response';


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
    private messageService: MessageService,
    private loader: LoaderService

  ) { }

  ngOnInit() {
    try {
      this.titleService.setTitle('Signup');
      this.registerForm = this.fb.group({
        firstName: ['Pawan', Validators.required],
        lastName: ['Sharma', Validators.required],
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
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loader.show('Submitting, Please wait', true);
      this.userService.postUser(this.registerForm.value).subscribe(res => {
        let msg: ResponseModel = { ok: res && res["auth"], message: '' }
        if (res && res["auth"]) {
          msg.message = 'User Registration Successful';
          this.registerForm.reset();
          this.submitted=false;
        }
        else
          msg.message = 'User Registration Failed';

        this.messageService.showMessage(msg);
        this.loader.hide();

      }, err => {
        this.loader.hide();
        this.messageService.showMessage(err);
console.log('err',err);
      });
    }
  }
}
