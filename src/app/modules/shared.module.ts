import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { ActionButtonComponent } from '../components/action-button/action-button.component';
import { SchemeListComponent } from '../components/scheme-list/scheme-list.component';
import { URLFriendlyPipe } from '../shared/pipes/urlfriendly.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumOnlyDirective } from '../shared/directives/num-only.directive';
import { PurchaseModalComponent } from '../components/purchase-modal/purchase-modal.component';
import { RedeemModalComponent } from '../components/redeem-modal/redeem-modal.component';
import { ErrorComponent } from '../components/error/error.component';
import { ProfilePictureComponent } from '../components/profile-picture/profile-picture.component';


@NgModule({
  declarations: [
    //components
    PageNotFoundComponent,
    LoaderComponent,
    ActionButtonComponent,
    SchemeListComponent,
    PurchaseModalComponent,
    RedeemModalComponent,
    ErrorComponent,  
    ProfilePictureComponent,
    //pipes
    URLFriendlyPipe,
    //directives
    NumOnlyDirective
  ],
  
  exports: [
    PageNotFoundComponent,
    LoaderComponent,
    ActionButtonComponent,
    SchemeListComponent,
    PurchaseModalComponent,
    RedeemModalComponent,     
    ErrorComponent,
    ProfilePictureComponent     
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
