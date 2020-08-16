import { Injectable, EventEmitter, Output } from '@angular/core';
import { ErrorModel } from 'src/app/models/error';
import { throwError } from 'rxjs';

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
}
