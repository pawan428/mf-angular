import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
const uri = environment.uri;

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }
    getUser() {
       return this.http.get(`${uri}/users`);
    }
   //  getUserById(id: number) {
   //     return this.http.get(`${uri}/user/id`);
   //  }
    getUserByEmail(email:string) {
      return this.http.get(`${uri}/user/email/${email}`);
   }
    postUser(user:User) {
       return this.http.post(`${uri}/auth/register`,user);
    }
    
}
