import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
      tap(isAuth => {
      if (!isAuth) {
        router.navigate(['/'], {
          queryParams: { returnUrl: state.url }
        });
      }
    })
  );
};
