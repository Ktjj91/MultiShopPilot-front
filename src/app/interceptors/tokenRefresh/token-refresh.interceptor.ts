import {HttpClient, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, switchMap, throwError} from 'rxjs';

export const tokenRefreshInterceptor: HttpInterceptorFn = (req, next) => {
 const http = inject(HttpClient);
 const router = inject(Router);

  return next(req.clone({ withCredentials: true })).pipe(
    catchError((err) => {
      if (err.status === 401) {
        return http.post('/api/token/refresh', {}, { withCredentials: true }).pipe(
          switchMap(() => next(req.clone({ withCredentials: true }))),
          catchError(() => {
            router.navigate(['/login']);
            return throwError(() => new Error('Session expirée'));
          })
        );
      }

      return throwError(() => err);
    })
  );
};
