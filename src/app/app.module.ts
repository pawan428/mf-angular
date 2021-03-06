import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { AuthGuard } from './shared/services/auth.guard';
import { CommonModule } from '@angular/common';
import { SharedModule } from './modules/shared.module';
import { LayoutModule } from './modules/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';
import { UtilService } from './shared/services/util.service';
import { HttpHeaderInterceptor } from './shared/interceptors/http-header.interceptor';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider  } from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1019758367150-ob2rfobsijnurmrdf44ifghphg6flbo1.apps.googleusercontent.com')
  },
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider('561602290896109')
  // },
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
  // }
]);

export function provideConfig() {
  return config;
}

//NOTE: dont pass data if want to set it from child component elase if you passed it will show from app component setPageTitle()
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/prelogin.module').then(m => m.PreloginModule)
  },
  {

    path: 'home',
    component: HomeComponent,
    data: { title: 'Bajaj Capital: Mutual Fund', description: 'helo description for portfolio', icon: 'pe-7s-wallet icon-gradient bg-plum-plate' }
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user.module').then(m => m.UserModule),
    data: { title: 'My Profile', description: '', icon: 'pe-7s-id icon-gradient bg-plum-plate' }

  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard.module').then(m => m.DashboardModule),
    data: { title: 'Dashboard', description: 'Highly configurable boxes best used for showing numbers in an user friendly way.', icon: 'pe-7s-monitor' }
  },
  {
    path: 'my-holdings',
    loadChildren: () => import('./modules/holdings.module').then(m => m.HoldingsModule),
    data: { title: 'My Holdings', description: 'My Holdings showing numbers in an user friendly way.', icon: 'pe-7s-monitor' }

  },
  {
    path: 'scheme-details',
    loadChildren: () => import('./modules/scheme-details.module').then(m => m.SchemeDetailsModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    SocialLoginModule,
    CommonModule,
    BrowserModule,
    LayoutModule,
    SharedModule
  ],
  providers: [AuthGuard, Title, UtilService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
