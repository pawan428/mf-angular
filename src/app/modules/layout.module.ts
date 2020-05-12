import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../layout/header/header.component';
import { PageTitleComponent } from '../layout/page-title/page-title.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SideNavComponent } from '../layout/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HeaderComponent,
    PageTitleComponent,
    FooterComponent,
    SideNavComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [HeaderComponent,
    PageTitleComponent,
    FooterComponent,
    SideNavComponent]
})
export class LayoutModule { }
