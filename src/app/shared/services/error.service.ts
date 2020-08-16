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
  catchError(err) {
    throwError(err);
    this.globalError.next(err);
  }
  handleLoginError(error: HttpErrorResponse) {
    let em: ErrorModel = { ok: false, message: '' };
    em.ok = error.ok;

    if (error.status === 0 || error.status === 500) {
      em.message = "Internal Server Error"
    }
    else if (error.status === 401) {
      em.message = "Invalid pair of username and password"
    }
    else if (error.status === 404) {
      em.message = "No user found with this email"
    }
    this.catchError(em);
  }
}
