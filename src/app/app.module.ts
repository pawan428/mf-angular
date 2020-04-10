import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { PageTitleComponent } from './layout/page-title/page-title.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { AuthGuard } from './shared/auth.guard';
import { SchemeListComponent } from './shared/scheme-list/scheme-list.component';
import { ColorChangerDirective } from './shared/color-changer.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageTitleComponent,
    FooterComponent,
    SideNavComponent,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [AuthGuard, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
