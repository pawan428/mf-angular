import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { LoaderComponent } from '../components/loader/loader.component';



@NgModule({
  declarations: [PageNotFoundComponent,LoaderComponent],
  exports: [PageNotFoundComponent,LoaderComponent],

  imports: [
    CommonModule
  ]
})
export class SharedModule { }
