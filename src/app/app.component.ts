import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { User } from './data/user';
import { UtilityService } from './shared/services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy { 
  title = "Dashboard";
  description = "hello description";
  icon = "pe-7s-car icon-gradient bg-mean-fruit";
  hasLoggedIn: boolean;

  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.isLoggedIn())
      this.router.navigate(['/dashboard']);
  }
  ngOnInit() {
    this.authService.hasLoggedInsubject.subscribe(x => {
      this.hasLoggedIn = x;
    });
  }
  ngOnDestroy() {
    this.authService.hasLoggedInsubject.unsubscribe();
  }
}
