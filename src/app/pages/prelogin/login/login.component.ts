import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Page } from 'src/app/data/page';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  constructor(private router: Router, private route: ActivatedRoute,
    private authService: AuthService, private titleService: Title) {
  }
  ngOnInit() {
    this.titleService.setTitle('Login');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
  onSubmit(f: NgForm) {
    this.authService.login();
    this.router.navigateByUrl(this.returnUrl);
  }

}