import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { LoaderService } from '../services/loader.service';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService, private loader: LoaderService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        //retry(1),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
         this.errorService.catchError(error);
         this.loader.hide();
          return throwError(error);
        })
      )
  }

}