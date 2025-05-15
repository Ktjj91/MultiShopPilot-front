import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {inject} from '@angular/core';
import {map} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService);
  const router:Router = inject(Router);


  if(authService.loggedIn() === null){
   return  authService.checkAuth().pipe(
      map(() => {
        if (authService.loggedIn() === true) return true;
        router.navigate(['/login'])
        return false;
      })
    );
  }

  if (authService.loggedIn() === true) return true;
  router.navigate(['/login']);
  return false;
};
