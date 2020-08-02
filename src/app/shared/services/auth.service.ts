import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const uri = environment.uri;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getLoggedInfo: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    let bool = false;
    this.getCurrentUser().subscribe(user => {
      this.getLoggedInfo.emit(user);
      bool = user ? true : false
    });
    return bool;
  }
  login(username: string, password: string) {
    let credential = { username, password };
    console.log(credential);
    this.http.post(`${uri}/auth/login`, credential).subscribe(r=>{
      console.log(r);
     // localStorage.setItem('user', JSON.stringify(user));

    });
  }
  logout() {
    let promise = new Promise((resolve, reject) => {
      //setTimeout(() => { //just for rnd, remove this later
      localStorage.removeItem('user');
      localStorage.removeItem('page');
      this.getLoggedInfo.emit(null);
      resolve();
      //}, 2000);
    })
    return promise;

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
