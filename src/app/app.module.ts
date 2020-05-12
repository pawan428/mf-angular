import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';
import { PageLandingComponent } from './pages/page-landing/page-landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './shared/services/auth.guard';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { HoldingsComponent } from './pages/holdings/holdings.component';
import { SchemeListComponent } from './components/scheme-list/scheme-list.component';
import { CommonModule } from '@angular/common';
import { SchemeDetailsComponent } from './pages/scheme-details/scheme-details.component';
import { URLFriendlyPipe } from './shared/pipes/urlfriendly.pipe';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedModule } from './modules/shared.module';
import { LayoutModule } from './modules/layout.module';

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
   
    PageLandingComponent,
    DashboardComponent,
    PortfolioComponent,
    HoldingsComponent,
    SchemeListComponent,
    SchemeDetailsComponent,
    URLFriendlyPipe,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
    LayoutModule,
    SharedModule    
  ],
  providers: [AuthGuard, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
