import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }
async errorMessage(error) {
    if (error.status == 0)
      return "Unknown error.";
    else if (error.status > 400 && error.status < 500)
      return "Invalid pair of username and password.";
    else if (error.status >= 500)
      return "Server Error! Login Failed."
  }
  
}
