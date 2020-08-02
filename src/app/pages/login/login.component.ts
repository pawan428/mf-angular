import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  returnUrl: string;
  constructor(private router: Router, private route: ActivatedRoute,
    private authService: AuthService, private titleService: Title, private loaderService: LoaderService) {
  }
  ngOnInit() {
    this.titleService.setTitle('Login');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
  onSubmit(f: NgForm) {
    console.log(f);
    this.loaderService.show('loading', false);   
    this.authService.login(f.value.username,f.value.password);
    this.router.navigateByUrl(this.returnUrl);
    this.loaderService.hide();
  }
  ngOnDestroy() {
    // this.loaderService.
  }
}