import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const uri = environment.uri;

@Injectable({
  providedIn: 'root'
})
export class
  AuthService {
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
  getAccessToken() {
    //console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }
  getCurrentUser() {
    return this.http.get(`${uri}/auth/my-profile`).toPromise();
  }
  googleSignin(token: string) {
    let body = { "token": token };
    return this.http.post(`${uri}/auth/google-signin`, body);
  }
}
