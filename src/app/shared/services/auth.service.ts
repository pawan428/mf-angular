import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const uri = environment.uri;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getLoggedInfo: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    let credential = { username, password };
    return this.http.post(`${uri}/auth/login`, credential);
  }
  logout() {
    let promise = new Promise((resolve, reject) => {
      localStorage.removeItem('token');
      localStorage.removeItem('page'); 
      this.getLoggedInfo.emit(null);    
      resolve();
    })
    return promise;

  }
  getCurrentUser() {
    // let token = localStorage.getItem('token');
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    // headers = headers.set('x-access-token', token);
    return this.http.get(`${uri}/auth/my-profile`).toPromise();
  }
}
