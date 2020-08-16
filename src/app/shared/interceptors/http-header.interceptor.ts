import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getAccessToken();
    const headerSettings: { [name: string]: string | string[]; } = {};
    headerSettings['Content-Type'] = 'application/json';
    headerSettings['x-access-token'] = token || "";

    const newHeader = new HttpHeaders(headerSettings);
    return next.handle(httpRequest.clone({ headers: newHeader }));
  }
}
