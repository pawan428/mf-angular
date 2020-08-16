import {

  HttpEvent,

  HttpInterceptor,

  HttpHandler,

  HttpRequest,

  HttpResponse,

  HttpErrorResponse

} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { Injector } from '@angular/core';



export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        //retry(1),
        catchError((error: HttpErrorResponse) => {
          console.log('pawan');
          return throwError(error);
        })
      )
  }

}