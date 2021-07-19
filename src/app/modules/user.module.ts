import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth.guard';
import { SharedModule } from './shared.module';
import { UserService } from '../shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { ChangePasswordComponent } from '../pages/change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]
  }
]
@NgModule({
    declarations: [UserProfileComponent, ChangePasswordComponent],
    imports: [
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      CommonModule,
      SharedModule,
      HttpClientModule
    ],
    providers:[UserService]
  })
export class UserModule { }
