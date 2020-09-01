import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { LoaderService } from '../services/loader.service';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService, private loader: LoaderService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        //retry(1),
        catchError((error: HttpErrorResponse) => {
         this.messageService.showMessage(error);
         this.loader.hide();
          return throwError(error);
        })
      )
  }

}