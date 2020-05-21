import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() currentUser;
  @Input() hasLoggedIn;
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }
  async logout() {
    await this.authService.logout(); 
    this.router.navigate(['/auth/login']);
  }
}
