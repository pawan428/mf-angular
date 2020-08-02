import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsernameValidator } from 'src/app/shared/validators/username-validators';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { SharedModule } from 'src/app/modules/shared.module';
import { NumOnlyDirective } from '../shared/directives/num-only.directive';
import { UserService } from '../shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'signup', component: SignupComponent,
  },
  
  {
    path: '**', component:PageNotFoundComponent
  },
]

@NgModule({
    
  declarations: [LoginComponent, SignupComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UsernameValidator, UserService]

})
export class PreloginModule { }
