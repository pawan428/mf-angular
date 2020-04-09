import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser;
  hasLoggedIn;
  constructor(private authService: AuthService) {
    this.authService.getLoggedInfo.subscribe(user => {
      this.currentUser = user;
      this.hasLoggedIn = user ? true : false;
    })
  }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
    console.log('logout');
  }
  ngOnDestroy() {
    this.authService.getLoggedInfo.unsubscribe();
  }
}
