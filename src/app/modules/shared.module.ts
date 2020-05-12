import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { ActionButtonComponent } from '../components/action-button/action-button.component';



@NgModule({
  declarations: [PageNotFoundComponent,LoaderComponent,ActionButtonComponent],
  exports: [PageNotFoundComponent,LoaderComponent,ActionButtonComponent],

  imports: [
    CommonModule
  ]
})
export class SharedModule { }
