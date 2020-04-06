import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router:Router, private authService: AuthService) {   
  }
  ngOnInit() {
  }
  onSubmit(f:NgForm) {
    this.authService.login(); 
    this.router.navigate(['dashboard']);  
  }
}
