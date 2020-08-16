import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user={};
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getCurrentUser().then(user => {
      this.user = user;      
    });
  }

}
