import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { PageTitleComponent } from './layout/page-title/page-title.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';

import { Routes, RouterModule } from '@angular/router';
import { PageLandingComponent } from './pages/page-landing/page-landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './shared/auth.guard';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { PortfolioDoughnutComponent } from './pages/portfolio-doughnut/portfolio-doughnut.component';
import { HoldingsComponent } from './pages/holdings/holdings.component';
import { SchemeListComponent } from './shared/scheme-list/scheme-list.component';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from './shared/action-button/action-button.component';
import { SchemeDetailsComponent } from './pages/scheme-details/scheme-details.component';
import { URLFriendlyPipe } from './shared/pipes/urlfriendly.pipe';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';

//NOTE: dont pass data if want to set it from child component elase if you passed it will show from app component setPageTitle()
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/prelogin/prelogin.module').then(m => m.PreloginModule)
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    data: { title: 'Dashboard', description: 'Highly configurable boxes best used for showing numbers in an user friendly way.', icon: 'pe-7s-monitor' }
  },
  {
    path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard],
    data: { title: 'Portfolio', description: 'helo description for portfolio', icon: 'pe-7s-portfolio' },
    children: [
      { path: 'portfolio/holdings', component: HoldingsComponent }
    ]
  },
  {
    path: 'scheme-details/:name', component: SchemeDetailsComponent, canActivate: [AuthGuard],
    //data: { title: ``, description: '', icon: 'pe-7s-wallet icon-gradient bg-plum-plate' }
  },
  {
    path: 'home', component: PageLandingComponent,
    data: { title: 'Bajaj Capital: Mutual Fund', description: 'helo description for portfolio', icon: 'pe-7s-wallet icon-gradient bg-plum-plate' }

  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageTitleComponent,
    FooterComponent,
    SideNavComponent,
    PageLandingComponent,
    DashboardComponent,
    PortfolioComponent,
    PortfolioDoughnutComponent,
    HoldingsComponent,
    SchemeListComponent,
    ActionButtonComponent,
    SchemeDetailsComponent,
    URLFriendlyPipe,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    SharedModule,
    BrowserModule,
    
  ],
  providers: [AuthGuard, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
