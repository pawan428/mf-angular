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
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    //components
    PageNotFoundComponent,
    LoaderComponent,
    ActionButtonComponent,
    SchemeListComponent,
    PurchaseModalComponent,
    RedeemModalComponent,

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
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
