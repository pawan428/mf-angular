import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth.guard';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
  }
]
@NgModule({
    declarations: [DashboardComponent],
    imports: [
      RouterModule.forChild(routes),
      CommonModule
    ]
  })
export class DashboardModule { }
