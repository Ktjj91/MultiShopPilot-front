import {HttpClient, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, switchMap, throwError} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';

export const tokenRefreshInterceptor: HttpInterceptorFn = (req, next) => {
 const http = inject(HttpClient);
 const router = inject(Router);
 const authService = inject(AuthService);

  if (req.url.includes('/api/token/refresh')
    || req.url.includes('/api/me')
    || req.url.includes('/api/login')
  ) {
    return next(req);
  }
  return next(req.clone({ withCredentials: true })).pipe(
    catchError((err) => {
      if (err.status === 401) {
        return http.post('/api/token/refresh', {}, { withCredentials: true }).pipe(
          switchMap(() => {
            return authService.checkAuth().pipe(
              switchMap(() => next(req.clone({ withCredentials: true })))
            );
          }),
          catchError(() => {
            router.navigate(['/login']);
            return throwError(() => new Error('Session expirée ou invalide'));
          })
        );
      }

      return throwError(() => err);
    })
  );
};
