import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { showErrorPopup, showWarningPopup } from './utils/toast-mesage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else if (error.status === 404) {
          errorMessage = `Error Code: ${error.status}\nMessage: Not Found`
        } else {
          // Server-side error
          let message: string = error?.error?.message?.split('.')[0] || error.message

          if (message.includes('API rate limit exceeded')) {
            message = 'API rate limit exceeded'
          }
          errorMessage = message || `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
                
        return throwError(errorMessage);
      })
    );
  }
}
