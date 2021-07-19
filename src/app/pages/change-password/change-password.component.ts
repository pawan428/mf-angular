import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password-validators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageType } from 'src/app/models/response';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  submitted = false;
  cpForm: FormGroup;
  error: HttpErrorResponse;
  constructor(private fb: FormBuilder, private router: Router, private titleService: Title,
    private loaderService: LoaderService, private authService: AuthService, private msgService: MessageService) {

  }
  get f() {
    return this.cpForm.controls;
  }

  ngOnInit() {
    this.titleService.setTitle('Change Password');
    this.cpForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: ConfirmPasswordValidator("newPassword", "confirmPassword")
      });
  }
  changePassword() {
    this.submitted = true;
    if (this.cpForm.invalid) {
      return;
    }
    
   // console.log(this.cpForm.value);
    this.authService.changePassword(this.cpForm.value).subscribe((d) => {
      console.log(d["error"]);
      this.msgService.showMessage(d,MessageType.success);
    });
  }
}
