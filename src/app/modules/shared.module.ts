import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { ActionButtonComponent } from '../components/action-button/action-button.component';
import { SchemeListComponent } from '../components/scheme-list/scheme-list.component';
import { URLFriendlyPipe } from '../shared/pipes/urlfriendly.pipe';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    LoaderComponent,
    ActionButtonComponent,
    SchemeListComponent,

    //pipes
    URLFriendlyPipe
  ],
  
  exports: [
    PageNotFoundComponent,
    LoaderComponent,
    ActionButtonComponent,
    SchemeListComponent
  ],

  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
