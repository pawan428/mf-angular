import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth.guard';
import { SharedModule } from './shared.module';
import { UserService } from '../shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard],
  }
]
@NgModule({
    declarations: [UserProfileComponent],
    imports: [
      RouterModule.forChild(routes),
      CommonModule,
      SharedModule,
      HttpClientModule
    ],
    providers:[UserService]
  })
export class UserModule { }
