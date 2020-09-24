import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { LoaderService } from '../services/loader.service';
import { MessageType } from 'src/app/models/response';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService, private loader: LoaderService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMesage = typeof error.error === 'string' ? error.error : error.statusText;
          this.messageService.showMessage(errorMesage, MessageType.error);
          this.loader.hide();
          return throwError(error);
        })
      )
  }

}