import { Injectable, EventEmitter, Output } from '@angular/core';
import { ErrorModel } from 'src/app/models/error';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  @Output() globalError: EventEmitter<ErrorModel> = new EventEmitter();

  constructor() { }
  reset() {
    // let em: ErrorModel = { ok: false, statusText: '' };
    this.globalError.next(null);
  }
  catchError(error) {
    let em: ErrorModel =error;
    if (error.status === 0 || error.status === 500) {
      em.statusText = "Internal Server Error"
    }
    this.globalError.next(em);
    throwError(error);
  }
  handleLoginError(error: HttpErrorResponse) {
    let em: ErrorModel = { ok: false, statusText: '' };
    em.ok = error.ok;

    if (error.status === 0 || error.status === 500) {
      em.statusText = "Internal Server Error"
    }
    else if (error.status === 401) {
      em.statusText = "Invalid pair of username and password"
    }
    else if (error.status === 404) {
      em.statusText = "No user found with this email"
    }
    this.catchError(em);
  }
}
