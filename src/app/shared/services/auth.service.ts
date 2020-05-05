import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/data/user';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getLoggedInfo: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    let bool = false;
    this.getCurrentUser().subscribe(user => {
      this.getLoggedInfo.emit(user);
      bool = user ? true : false
    });
    return bool;
  }
  login() {
    let user = new User();
    user.name = "Pawan Sharma";
    user.role = "Administrator";
    user.id = 1;
    localStorage.setItem('user', JSON.stringify(user));
  }
  logout() {    
    this.router.navigate(['/auth/login']);
    localStorage.removeItem('user');
    localStorage.removeItem('page');
    this.getLoggedInfo.emit(null);
  }
  getCurrentUser() {
    let user: User;
    let jsonstring = localStorage.getItem('user');
    const simpleObservable = new Observable((observer) => {
      if (jsonstring)
        user = JSON.parse(jsonstring);
      observer.next(user)
      observer.complete()          
    })
    return simpleObservable;
  }
}
