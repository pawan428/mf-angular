import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../components/_layout/header/header.component';
import { PageTitleComponent } from '../components/_layout/page-title/page-title.component';
import { FooterComponent } from '../components/_layout/footer/footer.component';
import { SideNavComponent } from '../components/_layout/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';


@NgModule({
  declarations: [HeaderComponent,
    PageTitleComponent,
    FooterComponent,
    SideNavComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule
  ],
  exports: [HeaderComponent,
    PageTitleComponent,
    FooterComponent,
    SideNavComponent,
  ]
})
export class LayoutModule { }
