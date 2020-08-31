import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth.guard';
import { SchemeDetailsComponent } from '../pages/scheme-details/scheme-details.component';

const routes: Routes = [
  {
    path: ':name', component: SchemeDetailsComponent, canActivate: [AuthGuard]
      }
]
@NgModule({
  declarations: [SchemeDetailsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class SchemeDetailsModule { }
