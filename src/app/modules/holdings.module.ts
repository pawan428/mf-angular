import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth.guard';
import { HoldingsComponent } from '../pages/holdings/holdings.component';
import { SharedModule } from './shared.module';

const routes: Routes = [
  {
    path: '', component: HoldingsComponent, canActivate: [AuthGuard],
  }
]
@NgModule({
  declarations: [HoldingsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})

export class HoldingsModule { }
