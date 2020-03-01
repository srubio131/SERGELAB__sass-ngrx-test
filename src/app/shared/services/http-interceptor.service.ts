import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import {
  HttpRequest,
  HttpResponse,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";

import { LoaderService } from "./loader.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return this.handle(next, req);
  }

  private handle(next: HttpHandler, req: HttpRequest<any>): Observable<any> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loaderService.hide();
        }
      }),
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.loaderService.hide();
        }
        return Observable.throw(error);
      })
    );
  }
}
