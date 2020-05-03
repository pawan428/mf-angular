import { NgModule } from '@angular/core';
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
    path: 'scheme-details/:name', component: SchemeDetailsComponent,canActivate: [AuthGuard],
    data: { title: `Scheme-details`, description: 'details of scheme', icon: 'pe-7s-wallet icon-gradient bg-plum-plate' }
  },
  {
    path: 'home', component: PageLandingComponent,
    data: { title: 'Mutualfund', description: 'helo description for portfolio', icon: 'pe-7s-wallet icon-gradient bg-plum-plate' }

  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**',redirectTo: '/home'  }
];

@NgModule({
  declarations: [    
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
  imports: [RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
