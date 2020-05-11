import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { LoaderComponent } from '../pages/loader/loader.component';



@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }