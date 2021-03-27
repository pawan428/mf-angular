import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const uri = environment.uri;

@Injectable({
  providedIn: 'root'
})
export class SchemeService {

  constructor(private http: HttpClient) { }
  getSchemes(v:string) {
    return this.http.get(`${uri}/scheme?q=${v}`);
  }
}
