import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { AuthService as SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() currentUser;
  @Input() hasLoggedIn;
  constructor(private authService: AuthService, private router: Router, private socialAuthService: SocialAuthService) {
  }

  ngOnInit() {
  }

  async logout() {
    this.socialAuthService.signOut().catch(error=>{
      console.log(error);
    });
      

    await this.authService.logout().then(() => {
      this.router.navigate(['/home']);
    });
  }
}
