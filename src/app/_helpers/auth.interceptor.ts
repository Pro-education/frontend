import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    console.log("ok")
    if (token != null) {

      console.log("setToken")
      authReq = req.clone(
        { headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) }
      );
      console.log(authReq)
    }
    return next.handle(authReq);
  }
}
