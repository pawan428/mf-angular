import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { User } from 'src/app/data/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  hasLoggedInsubject = new BehaviorSubject(false);

  constructor(private router: Router) { }
  isLoggedIn() {
    let user = this.getCurrentUser();
    console.log('isLoggedIn', user);
    this.hasLoggedInsubject.next(user ? true : false);
    return (user ? true : false);

  }
  login() {
    let user = new User();
    user.name = "Pawan Sharma";
    user.role = "Administrator";
    user.id = 1;
    localStorage.setItem('user', JSON.stringify(user));
    //this.router.navigate(['/postlogin/dashboard']);
    this.hasLoggedInsubject.next(true);
  }
  logout() {
    this.hasLoggedInsubject.next(false);
    localStorage.removeItem('user');
    this.router.navigate(['/home']);

  }
  getCurrentUser(): User {
    let user: User;
    let jsonstring = localStorage.getItem('user');
    if (jsonstring) {
      try {
        user = JSON.parse(jsonstring);
      } catch (error) {
        console.error('unable to get user information')
      }
      return user;
    }
    return user;
  }

}
