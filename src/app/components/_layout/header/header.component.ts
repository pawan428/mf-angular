import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() currentUser;
  @Input() hasLoggedIn;
  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
  }

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout().then(() => {
     // this.messageService.showMessage({ ok: true, statusText: "You have logged out successfully" });
      this.router.navigate(['/auth/login']);
    });
  }
}
