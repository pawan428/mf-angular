import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;
  @Input()
  hasLoggedIn;
  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
    console.log('logout');
  }
}
