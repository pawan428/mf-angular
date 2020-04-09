import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { User } from 'src/app/data/user';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // hasLoggedInsubject = new BehaviorSubject(false);
  // currentUserSubject = new BehaviorSubject(User);
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
    localStorage.removeItem('user');
    this.getLoggedInfo.emit(null);
    this.router.navigate(['/home']);
  }
  getCurrentUser() {
    let user: User;
    let jsonstring = localStorage.getItem('user');
    user = JSON.parse(jsonstring);
    const simpleObservable = new Observable((observer) => {
      // observable execution
      if (!jsonstring) {
        observer.next(null)
      }
      else
      observer.next(user)
      observer.complete()
    })
    return simpleObservable;
  }
}
