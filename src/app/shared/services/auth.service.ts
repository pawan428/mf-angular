import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
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
  getAccessToken()
  {
    //console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }
  getCurrentUser() {    
    return this.http.get(`${uri}/auth/my-profile`).toPromise();
  }
}
