import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input()
  hasLoggedIn;
  constructor(private authService: AuthService) {
    // this.authService.hasLoggedInsubject.subscribe(x => {
    //   this.hasLoggedIn = x;
    // });
  }
  ngOnInit() {
  }

}
